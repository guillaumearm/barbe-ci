Source code architecture
=============

### src/
- boot/
  - ./index.js
  - ./index.html
- App/
  - domain components
  - domain updaters
  - domain sagas
  - domain actions
- Components/
  - basic components (links, buttons, ...)
  - others common components (calendar, ...)
- store/
  - internal global store
  - expose all global selectors
  - assemble all domain reducers and sagas
- utils/
  - fp/
  - hoc/
  - store/
