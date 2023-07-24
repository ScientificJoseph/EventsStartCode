class DOMHelper { // called from connectSwithchButton() in ProjectItem
    static clearEventListeners(element) { //gets rid of old ebentListener for an element. called from connectSwithchButton
        const clonedElement = element.cloneNode(true) // makes deep clone of button. Default value is false.
        element.replaceWith(clonedElement) // called in connectSwithchButton. Creates new button with a clone of old one clearing eventListener.
        return clonedElement; // returns the new button
    }

    static moveElement(elementId, newDestinationSelector) { // parameters of project to add received from addProject
        const element = document.getElementById(elementId); // id of element to be moved
        const destinationElement = document.querySelector(newDestinationSelector); //place where elemt will be moved
        destinationElement.append(element) // puts moved element in its place
        element.scrollIntoView({behavior: 'smooth'})
    }
}

class Component { // base class for attach and detach
    constructor(hostElementId, insertBefore = false) { //parameters received from Tooltip super constructor if any where false can be overwritten
        if(hostElementId) { // check to see if it is set
            this.hostElement = document.getElementById(hostElementId); // if id is passed host elemnet id is used by attach method to determine where tooltip dialog will appear
        } else {
            this.hostElement = document.body; // used if null is received from super constuctor call when ToolTip is extended. attach method terinary operator will be false and this.element will appear before the end of the body of the document  
        } 
        this.insertBefore = insertBefore; //default is false. true if true is passed to constructor
    }
    detach(){ 
        if (this.element) {
            this.element.remove() // refers to the element stored in attach method
            // this.element.parentElement.removeChild(this.element) //older browser support
        } 
    }

    attach() { // called from showMoreInfoHandler method in ProjectItem .determines where toolTip dialog will appear based on parameter status.
        // document.body.append(this.element)
        this.hostElement.insertAdjacentElement(this.insertBefore ? 'afterbegin' : 'beforeend', this.element) //if arguments recieved to constructor call when toolTip extends component this wdill detemin where tooltip dialog will appear. if none are received the toolTip dialog will appear before the end of the document body
        // console.log(this.insertBefore)
    }
}

class Tooltip extends Component{
    constructor(closeNotifierFunction, text, hostElementId) { //function parameter and dataset text received on instatiation in ProjectItem showMoreInfoHandler(). closeNotifierFunction Ensures that a toolTtip dialog box status is not active. hostElementId is received from projectItem function showMoreInfoHandler and is used for positioning toolTip
        super(hostElementId); // calls constructor in component and receives the id of the element containing the tool tip to be positioned. used in the create method below
        // super('active-projects', true); //can be used to pass parameters to Component constructor that will determin where toolTip dialog will appear
        this.closeNotifier = closeNotifierFunction;
        this.text = text;
        this.create(); // calls create method on instantiation to create toolTip dialog element
    }

    closeTooltip = () => {// when using arrow functions this refers to the class automatically on function being called. no need to bind call to this
        this.detach(); // removes toolTip
        this.closeNotifier() //calls method passed to constructor on instatiation that sets hasActiveToolTip value to false when tooltip is closed allowing another toolTip dialog to be displayed if neccessary
    }

    create() {
        const tooltipElement = document.createElement('div') // div for tooltip element
        tooltipElement.className = 'card';
        // tooltipElement.textContent = this.text //received from constructor parameter text
        const tooltipTemplate = document.getElementById('tooltip');
        const tooltipBody = document.importNode(tooltipTemplate.content, true)
        tooltipBody.querySelector('p').textContent = this.text;
        tooltipElement.append(tooltipBody)
        // console.log(this.hostElement.getBoundingClientRect())
        console.log(this.hostElement)
        const hostElPosLeft = this.hostElement.offsetLeft;
        const hostElPosTop = this.hostElement.offsetTop;
        const hostElHeight = this.hostElement.clientHeight;
        const parentHostScrolling = this.hostElement.parentElement.scrollTop // takes into account the scroll distance from top of parent element (UL)
        console.log(this.hostElement.parentElement)

        const x = hostElPosLeft + 20;
        const y = hostElPosTop + hostElHeight - parentHostScrolling - 10;

        tooltipElement.style.position = 'absolute' // absolute property needed to take the elemnt out of the flow of the document and allow it to be positioned independently
        tooltipElement.style.left = `${x}px`//px needs to be added just like in css
        tooltipElement.style.top = `${y}px`

        tooltipElement.addEventListener('click', this.closeTooltip) // adds eventListener to div and calls closeToolTip on click to remove the toolTip and set hascActive to false. binding is not needed to to close tool tip being an arrow function 
        this.element = tooltipElement // The methods detach and attach extended from Component use this to remove or determine where the tooltip dialog will apear
    }

}

class Projectitem {
    hasActiveToolTip = false; // set up to see if item already has an active toolTip

    constructor(id, updateProjectListFunction, type) { // parameters receivved from ProjectList constructor on ProjectItem instatiation
        this.id = id; //id of DOM node
        this.updateProjectListHandler = updateProjectListFunction; // switchHandler() from ProjectList
        this.connectMoreInfoButton();
        this.connectSwithchButton(type);
    }

    showMoreInfoHandler() { // called when more info Btn is clicked
        if (this.hasActiveToolTip) { //stops addition toolTip project information dialog from being added if it is already present
            return;
        }
        const projectElement = document.getElementById(this.id); // project list item id
        const tooltipText = projectElement.dataset.extraInfo // dataset name is converted from extra-info automatically
        const tooltip = new Tooltip(() => { //creates toolTip object. On instantiation passes anonomous function to the constructor that when called sets the value of hasActiveTooltip to false when toolTip is closed
            this.hasActiveToolTip = false;
        }, tooltipText, this.id) // On instantiation passed to toolTip object. this.id id is passed to the tooltip to identify the element in toolTip create function.
        tooltip.attach();  //calls attatch method in Tooltip extended Class Component object that determsines where tooltip dialog will appear 
        this.hasActiveToolTip = true; // sets tooltip element status to active to ensure that that clicking More Info Btn won't add another toolTip.
    }
   
    connectMoreInfoButton(){ //connects to more info Button
        const projectItemElement = document.getElementById(this.id);
        const moreInfoBtn = projectItemElement.querySelector('button:first-of-type')
        moreInfoBtn.addEventListener('click', this.showMoreInfoHandler.bind(this)); //adds eventListtener to More Info Btn. calls method whe clicked
    }

    connectSwithchButton(type) { //type received from call to functiom
        const projectItemElement = document.getElementById(this.id);
        let switchBtn = projectItemElement.querySelector('button:last-of-type');
        switchBtn = DOMHelper.clearEventListeners(switchBtn) // passes button to DOMHelper static method to clear any pre-existing eventListeners
        switchBtn.textContent = type ==='active' ? 'Finish' : 'Activate'; //changes the tect when active/finished status changes
        switchBtn.addEventListener('click', this.updateProjectListHandler.bind(null, this.id))//received from update. binds switchProject to Btn with the id as a parameter for the function. when clicked, switchHandler/addProject is invoked in the current instance.
    }

    update(updateProjectListFn, type) { //received on call from addProject in ProjectList
        this.updateProjectListHandler = updateProjectListFn //received from constructor. tied to addProject/switchProject
        this.connectSwithchButton(type); ///passes type to connectSwithchButton
    }
}

class ProjectList {
    projects = []
   
    constructor(type) { // type received on instantiation
        this.type = type;
        const prjItems = document.querySelectorAll(`#${type}-projects li`);
        for (const prjItem of prjItems) {
            this.projects.push(new Projectitem(prjItem.id, this.switchProject.bind(this),this.type)) //project we want to switch passed to ProjectItem Constructor then passed to eventlistener to call switchProject
        }
    }

    setSwitchHandlerFunction(switchHandlerFunction){ //gets called on instatiation and passed pointer to object functiion addProject
        this.switchHandler = switchHandlerFunction // switchHandler gets assigned pointer to the function addProject on instantiation - used by switchProject  
    
    }

    addProject(project) { // called in switchProject from switchHandler in the instance that will add project - gets passed projectId from swithcProject
        this.projects.push(project) //gets project from array
        DOMHelper.moveElement(project.id, `#${this.type}-projects ul`) //calls DOMHelper static method moveElemt and passes elementId and ul Id type of list item to be moved
        project.update(this.switchProject.bind(this), this.type)//calls update method in ProjectItem and passes swithcProject method. reaches out to project we get as argument. used as defined in class App for newInstance. type lets it know which list its in(important for updateing buttom txt)
    }

    switchProject(projectId) { //passed to ProjectItem constructor then to eventListener / getrs projectTd from eventListener passes to addProject
        // const projectIndex = this.projects.findIndex(p => p.id === projectId)
        // this.projects.splice(projectIndex, 1);
        this.switchHandler(this.projects.find(p => p.id === projectId)) // gets the project that we want to switch for addProject method to carry out. calls addProject from evenListner fireing switchProject
        this.projects = this.projects.filter(p => p.id !== projectId);
        
    }
}

class App {
 
    static init() {
        const activeProjectList = new ProjectList('active'); // type passed to constructor
        const finishedProjectList = new ProjectList('finished');
        activeProjectList.setSwitchHandlerFunction(finishedProjectList.addProject.bind(finishedProjectList)); // calls SwitchHandlerFunction on instatiation, defines which objects addProduct method should be called by connecting/binding addProject from finishedProject. When switchProject is invoked on click switchHandler gets called invoking addProject method.
        finishedProjectList.setSwitchHandlerFunction(activeProjectList.addProject.bind(activeProjectList));
        // const someScript = document.createElement('script');
        // someScript.textContent = 'alert("Hi There...")';
        // document.head.append(someScript)

        // this.startAnalytics()
        // document.getElementById('start-analytics-btn').addEventListener('click', this.startAnalytics)

        // const timerId = setTimeout(this.startAnalytics, 3000) // accepts functions, time, array of arguments

        // document.getElementById('stop-analytics-btn').addEventListener('click', () => {
        //     clearTimeout(timerId) // must pass the id. this doenet stop timeout due to interval set in analytics.js
        // })
        

    }
    static startAnalytics() {
        const analyticsScript = document.createElement('script');
        analyticsScript.src = 'assets/scripts/analytics.js';
        analyticsScript.defer = true;
        document.head.append(analyticsScript);
    }
}

App.init();
