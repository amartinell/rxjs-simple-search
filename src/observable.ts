// import {from, Observable, of} from 'rxjs';
//
// // Esempio creazione observable
// const observable = new Observable((subscriber) => {
//   subscriber.next(1);
//   subscriber.next(2);
//   subscriber.next(3);
//   setTimeout(() => {
//     subscriber.next(4);
//     subscriber.complete();
//   }, 1000);
// });
//
// const subscription = observable.subscribe({
//   next: (value) => {},
//   error: (error) => { },
//   complete: () => {
//     console.log('complete!');
//   }
// });
// subscription.unsubscribe(); // memory leaks
//
//
// // array
// const myArray = [1, 2, 3, 4, 5];
// const observableFromArray = new Observable((subscriber) => {
//   myArray.forEach((value) => subscriber.next(value));
//   subscriber.complete();
// });
//
// const observableFromArray2 = from([1, 2, 3, 4, 5]);
// //output: 1,2,3,4,5
//
//
//
// const source = of({ name: 'Brian' }, [1, 2, 3], function hello() {
//   return 'Hello';
// });
// //output: {name: 'Brian'}, [1,2,3], function hello() { return 'Hello' }
//
//
//
// const fromEventHomemade = (element: HTMLElement, eventName: string) => {
//   return new Observable((subscriber) => {
//     const handler = (e: Event) => subscriber.next(e);
//     element.addEventListener(eventName, handler);
//
//     return () => {
//       element.removeEventListener(eventName, handler);
//     };
//   });
// }
// const sub = fromEventHomemade(document.getElementById('pippo')!, 'click')
//   .subscribe((e) => console.log(e));
// // FYI: fromEvent() is a built-in RxJS function that does the same thing
//
//
// // Also useful:
// // BehaviourSubject: it emits the most recent value to new subscribers