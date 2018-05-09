## Walkthru of how pages are built
There are 3 circumstances where data is fetched from the MovementVote WP backend data site and merged with React code to generate page:

- __User browsing__ - As the user navigates between pages, all the data is fetched in the browser and the page is rendered directly to the live DOM

- __`gulp` build__ - On the developer's machine the build will fetch the data and render the pages to HTML (text) files

- __Deploy__ - For production deployment to the static S3 bucket, the data is fetched and page generation as part of building the site on a AWS Code Build server.

The key to the code is understanding where these paths converge/diverge.

- User clicks on a link which is handled in [client/../LinkToRoute](./[src/client/services/LinkToRoute.js) or uses the 'back' button which [client/../router.js](./src/client/services/router.js) hooks the `window.onpopstate` event. For the build version [static-render.js](./src/server/static-render.js) iterates through the [routes map](./src/shared/services/route-map.js) and explicitly triggers a render of every page. All of these codepaths send a `navigateTo` request to the Redux store

- Once inside [navigateTo](./src/shared/store/actions/router.js#navigateTo) and the data is fetched and the results and matching React page component is put in the Redux store.

- `navigateTo` emits a NAVIGATION_STARTS state change. [client/browser.js](./src/client/browser.js) watches the store change and tells React to render into the live browser DOM. [server/router.js](./src/server/router.js) watches the store change and tells React to render to an HTML string.

- All code paths use the [App component](./src/client/components/App.jsx) which pulls the page component from store state to render as a child 
````javascript
const mapStateToProps = ({ 
        router: { 
          target: {
            routeModel: {
              component
            }
            ...
          },
        } 
      }) => ({ component, ... })
````

- Individual page components dig the fetched data out of the Reudx store's state as part of `mapStoreToProps`. A good example can be seen in the [Advisors](./src/client/components/AdvisorPage.jsx) page
````javascript
const mapStoreToProps = ({
  router: {
    target: {
      model: {
        advisors // <--
      }
    }
  }
}) => ({ advisors })
````

