/** Globally declared interfaces */
declare interface Action<Payload> {
  type: string;
  payload?: Payload;
  error?: boolean;
}
declare interface TodoItemData {
  id?: number;
  text?: string;
  completed?: boolean;
}

declare type TodoStoreState = TodoItemData[];
declare type TodoActionPayload = TodoItemData;


/** Add dummy declaration for developement with webpack */
interface RequireInterface {
  (module: string): any;
  ensure: (module: string) => any;
}
declare var module: any;
declare var require: RequireInterface;

