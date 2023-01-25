import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

function renderWithRouter(component) {
  const customHistory = createMemoryHistory();

  const returnFromRender = render(
    <Router history={ customHistory }>
      {component}
    </Router>,
  );

  return { history: customHistory, ...returnFromRender };
}

export default renderWithRouter;

// import React from 'react';
// import { createMemoryHistory } from 'history';
// import { Router } from 'react-router-dom';
// import { render } from '@testing-library/react';

// function withRouter(component, history) {
//   return (
//     <Router history={ history }>
//       { component }
//     </Router>
//   );
// }

// function withRedux(component, store) {
//   return (
//     <Provider store={ store }>
//       { component }
//     </Provider>
//   );
// }

// export function renderWithRouter(
//   component,
//   {
//     initialPath = '/',
//     history = createMemoryHistory([initialPath]),
//   } = {},
// ) {
//   return {
//     ...render(withRouter(component, history)),
//     history,
//   };
// }

// export function renderWithRedux(component, options = {}) {
//   const {
//     initialState,
//     store = initialState
//       ? createStore(rootReducer, initialState, applyMiddleware(thunk))
//       : createStore(rootReducer, applyMiddleware(thunk)),
//   } = options;

//   return {
//     ...render(withRedux(component, store)),
//     store,
//   };
// }

// export function renderWithRouterAndRedux(component, options = {}) {
//   const {
//     initialPath = '/',
//     history = createMemoryHistory([initialPath]),
//   } = options;

//   return {
//     ...renderWithRedux(withRouter(component, history), options),
//     history,
//   };
// }
