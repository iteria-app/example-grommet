// import * as React from "react"
// import * as ReactDom from "react-dom"
// import * as GrommetThemeV1 from "grommet-theme-v1"
// import * as PropTypes from "prop-types"
// import * as Grommet from "grommet"
// import * as GrommetIcons from "grommet-icons"
// import * as ReactRouterDom from "react-router-dom"
// import * as StyledComponents from "styled-components"

// const dependencies = {
//   react: React,
//   "react-dom": ReactDom,
//   "grommet-theme-v1": GrommetThemeV1,
//   "prop-types": PropTypes,
//   grommet: Grommet,
//   "grommet-icons": GrommetIcons,
//   "react-router-dom": ReactRouterDom,
//   "styled-components": StyledComponents,
// }

// window.__deps = dependencies

import React, { Component } from "react"
import { render } from "react-dom"
import { Grommet, ResponsiveContext } from "grommet"
import { theme } from "./theme"
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Dashboard, HelloWorld } from "./components"
import { CustomerListView } from "./components/Customers/CustomersListView";

class AppBody extends Component {
  static contextType = ResponsiveContext

  render() {
    return (
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/hello' component={HelloWorld} />
        <Route exact path='/customers' component={CustomerListView} />
      </Switch>
    )
  }
}

function loadLocaleData(locale: string) {
  switch (locale) {
    case 'sk':
    case 'sk-SK':
      return import('./compiled-lang/sk.json');
    default:
      return import('./compiled-lang/en.json');
  }
}

interface Message {
  [key: string]: any;
}

type AppProps = {
  locale: string,
  messages: Message
}

const App: React.FC<AppProps> = ({ locale, messages }) => {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <Router>
        <Grommet theme={theme} full>
          <AppBody />
        </Grommet>
      </Router>
    </IntlProvider>
  )
}
const locale = navigator.language;

//@ts-ignore
if (!window.__skip_render) {
  const messages = loadLocaleData(locale);
  render(<App locale={locale} messages={messages} />, document.getElementById("root"))

}
