import React from 'react';
import logo from './logo.svg';
import './App.css';
import { createClient } from 'contentful';
import PropTypes from 'prop-types';

const client = createClient({
  space: '74z0bk84tkpl',
  accessToken: '8xprGk2qqagBa53RVuIIY5v7T3eV4vZy1Wv9YUZYMBo',
  environment: 'dev'
});

const contentTypeToComponent = {
  'freemiumPage': 'FreemiumPage'
};

class FreemiumPage extends React.Component {
  render() {
    return <div>
      <h1>Freemium Page</h1>
    </div>
  }
}

class Contentful extends React.Component {
  static propTypes = {
    query: PropTypes.object.isRequired,
    render: PropTypes.func.isRequired
  }

  constructor(...args) {
    super(...args);
    this.state = {
      error: null,
      items: [],
      query: this.props.query
    }
  }

  componentDidMount() {
    client.getEntries(this.state.query)
      .then(({ items }) => {
        console.log(items);
        return this.setState({
          items
        })
      })
      .catch(
        error => this.setState({
          error
        })
      )
  }

  render() {
    console.log(this.state);
    return this.props.children({
      items: this.state.items,
      error: this.state.error
    })
  }
}

function App() {
  return (
    <div className="App">
      <Contentful query={{ content_type: 'freemiumPage', limit: 1 }}>
        {({ items }) => (
          <ul>
            {items.map(item => {
              let Component = contentTypeToComponent[item.sys.contentType.sys.id];
              return <Component {...item.fields} />
            })}
          </ul>
        )}
      </Contentful>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
