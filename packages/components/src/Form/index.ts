import { Form as Form0 } from './Form';
import { FormItem } from './FormItem';
import { Item } from './Item';
import { List } from './List';
import { Provider } from './Provider';
import { useForm } from './useForm';
export { useFormContext, useWatch } from 'react-hook-form';
export { Form, FormItem, useForm };

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

export default Form;
