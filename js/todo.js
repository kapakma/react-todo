class TodoApp extends React.Component {
    constructor() {
        super();

        this.state = {
            title: "Lorem ipsum",
            numLeft: 0,
            showCompleted: false,
            list: [
                {text: "item 1", isChecked: false},
                {text: "item 2", isChecked: true},
                {text: "item 4", isChecked: false},
                {text: "item 5", isChecked: false},
                {text: "item 6", isChecked: true},
                {text: "item 7", isChecked: false},
                {text: "item 8", isChecked: false}
            ],
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    handleCheckboxChange(index) {
        let list = this.state.list;
        let item = list[index];

        item.isChecked = !item.isChecked;
        list[index] = item;

        let count = 0;
        for (let i = 0; i < list.length; i++) {
            if (!list[i].isChecked) {
                count++;
            }
        }

        this.setState(
            {list: list, numLeft: count}
        );


    }

    handleClick(event) {
        const val = !this.state.showCompleted;

        this.setState({
            showCompleted: val
        });
    }

    componentWillMount() {
        let count = 0;
        for (let i = 0; i < this.state.list.length; i++) {
            if (!this.state.list[i].isChecked) {
                count++;
            }
        }

        this.setState(
            {numLeft: count}
        );
    }

    render() {
        return (
            <div className="todo-app">
                <div>
                    <div>{this.state.title}</div>
                    <div>{this.state.numLeft}</div>
                </div>
                <ItemList onChange={this.handleCheckboxChange} showAll={this.state.showCompleted} items={this.state.list} />
                <ShowButton onClick={this.handleClick} showCompleted={this.state.showCompleted} />
            </div>
        );
    }
}

class ItemList extends React.Component {
    render() {
        const listItems = this.props.items.map(
            (item, index) => {
                if (this.props.showAll || !item.isChecked) {
                    return (
                        <li className="list-group-item" key={index}>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" checked={item.isChecked} onChange={() => this.props.onChange(index)}/> 
                                    {item.text}
                                </label>
                            </div>
                        </li>
                    );
                }
            }
        );
        
        return (
            <ul className="list-group">{ listItems }</ul>
        );
    }
}

class ShowButton extends React.Component {
    render() {
        return (
            <button onClick={() => this.props.onClick()}>
                {this.props.showCompleted ? "Hide" : "Show" } Completed 
            </button>
        );
    }
}

ReactDOM.render(
    <TodoApp />,
    document.getElementById("root")
);