# Calendar component
A test assignment for a React calendar component
## Description:
Microfrontends is a very popular design pattern nowadays that helps to deal with complexity in building web applications in big organizations. Splitting functionality into separate independent applications or separate pieces of the applications hosted independently helps teams to move quickly without strong dependencies but this approach might have negative consequences for look and feel of the complete solution comprised of those microfrontends. 
As an engineer you realize that there is an opportunity to help bring all of the user experience together and be more aligned by providing a shared React components library. 
Start such shared library and implement the first of the shared components - <CalendarComponent>.
This sort of calendar is planned to be used when presenting distribution of different events taking place on different days (the colored dot). The color of the dot should be configurable (for now in the design we see that there is green, orange and red, representing different statuses of the event, but it is possible that list of statuses would be different in different UIs using this component.

## Requirements:
* needs to take in the list of events to display;
* take into account what is needed to allow such component to be used in by other teams (all the needed props, callbacks, documentation/comments/meta);
* the solution should be complete and documented to a point that an engineer on our side should easily be able to try it out and it should "work on his machine too" (components dependencies and all…);

## Tips:
* functionalities implemented to a point where it is possible to demonstrate them;
* you should feel free to reuse any open source software as long as it has a license that allows reuse, if it will help you to achieve a working solution matching the UX design faster;
* try to think and demonstrate your skills as if this was really production code, so maybe 100% code test coverage is not required, but having some tests would demonstrate that you are able to test the code you write.