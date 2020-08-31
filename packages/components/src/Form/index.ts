import { Form as Form0 } from './Form';
import { FormItem, FormItemProps } from './FormItem';
export { useForm, useWatch, useFormContext } from 'react-hook-form';

import { Item } from './Item';
import { List } from './List';
import { Provider } from './Provider';
import { useForm } from './useForm';

type InternalForm = typeof Form0;

interface Form extends InternalForm {
  Item: typeof Item;
  List: typeof List;
  Provider: typeof Provider;
  useForm: typeof useForm;
}

const Form: Form = Form0 as Form;

Form.Item = Item;
Form.List = List;
Form.Provider = Provider;
Form.useForm = useForm;

export { Form, FormItem };

export default Form;
