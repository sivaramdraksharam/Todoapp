var ToDo = React.createClass({displayName: "ToDo",

    getInitialState: function(){
        return {Editing: false}
    },  
    render: function(){
        if(this.state.Editing)
        {
            return this.renderEditCard();
        }else
        {
            return this.renderDefaultCard();
        }
       
        },
        edit: function(){
            console.log("Editing task");
            this.setState({Editing: true});
            
        },delete: function(){
            console.log("Task deleted");
            this.props.onDelete(this.props.index);
        },save: function(){
            console.log("Task saved...");
            this.setState({Editing: false});
            var txt = this.refs.savedText.getDOMNode().value;
            console.log('saved text is ' + txt);
            this.props.onSave(this.refs.savedText.getDOMNode.value,this.props.index);
            
        },
        renderDefaultCard: function(){
            return(
                React.createElement("div", {className: "todo"}, 
                React.createElement("h3", null, this.props.children), 
                React.createElement("button", {className: "btn btn-primary glyphicon glyphicon-pencil", onClick: this.edit}), 
                React.createElement("button", {className: "btn btn-success glyphicon glyphicon-thumbs-up"}), 
                React.createElement("button", {className: "btn btn-warning glyphicon glyphicon-trash", onClick: this.delete})
                )
            )

        },
        renderEditCard: function()
        {
            return(
                React.createElement("div", {className: "todo"}, 
                React.createElement("textarea", {defaultValue: this.props.children, ref: "savedText"}), 
                React.createElement("button", {className: "btn btn-success glyphicon glyphicon-floppy-disk", onClick: this.save})
                )
            )

        }
});

var ToDoList = React.createClass(
    {displayName: "ToDoList",
        getInitialState: function(){
            return {
                tasks: []
            }
        },
        componentWillMount: function(){
            var self=this;
            if(this.props.count)
            {
                $.getJSON("http://baconipsum.com/api/?type=all-meat&sentences="+ this.props.count+"&start-with-lorem=1&callback=?",function(results){
                    results[0].split('. ').forEach(function(sentence){
                        self.addToList(sentence.substring(0,40));
                    })                        
                    });
            
            }
        },
        addToList: function(newText){
            var tasksArr = this.state.tasks;
            tasksArr.push(newText);
            this.setState({tasks: tasksArr});
        },
        saveList: function(newText,i){
            var tasksArr = this.state.tasks;
            tasksArr[i] = newText;
            this.setState({tasks: tasksArr});

        },deleteFromList: function(i)
        {   var tasksArr = this.state.tasks;
            tasksArr.splice(i,1);
            this.setState({tasks: tasksArr});

        },
        eachTask: function(task, i){
            return (
                React.createElement(ToDo, {index: i, onSave: this.saveList, onDelete: this.deleteFromList}, task)
            )
        },
        render: function(){
            return (            
            React.createElement("div", {className: "todo-list"}, 
                this.state.tasks.map(this.eachTask), 
                React.createElement("button", {className: "btn btn-default btn-sm glyphicon glyphicon-bell", align: "left"}), 
                React.createElement("button", {className: "btn btn-sm btn-success glyphicon glyphicon-plus", onClick: this.addToList.bind(null,"New Task")})
            
                )
            )
        }
    });

React.render(React.createElement(ToDoList, {count: 10}),document.getElementById('react-component'));
