import { Component, ComponentClass, ReactHTML } from 'react';
import { ElementFromHTMLTag } from './ElementFromHTMLTag';
import { Referable } from './Referable';

type InstanceOf<A extends { new (...params: Array<any>): any }> = A extends {
  new (...params: Array<any>): infer B;
}
  ? B
  : never;

export type RefOf<A extends Referable> = A extends Component<any, any>
  ? A
  : A extends ComponentClass<any>
  ? InstanceOf<A>
  : A extends keyof ReactHTML
  ? ElementFromHTMLTag<A>
  : A extends Element
  ? A
  : never;
