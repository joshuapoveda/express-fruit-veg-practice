const React = require('react');

class Show extends React.Component {
    render(){
        return (
            <div>
                <h1>Fruits show page</h1>
                The { this.props.fruit.name } is { this.props.fruit.color }
        { this.props.fruit.readyToEat ? `It is ready to eat` : `It is not ready to eat` }
            </div>
        )
    }
}
module.exports = Show;


//   Install the NPM package EXPRESS React Views, react, react-dom (This will let us make our pages appear in the dom)

// this is a templating library that allows us to mix data into our html
// the HTML will change based on the data!
// npm install jsx-view-engine react react-dom 
// Create a views directory inside our app directory
// Inside /views, create a file called Show.jsx(capitalized)

// this will be the html for our show route