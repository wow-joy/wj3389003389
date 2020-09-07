import React, { useContext, useRef, useCallback, useEffect } from 'react';
import { useForkRef, usePrevious, useControlState } from '@wowjoy/hooks';
import RadioGroupContext from './RadioGroupContext';

export interface EventTarget {
  value: any;
  checked: boolean;
  name: string;
  disabled: boolean;
  focus: () => void;
  blur: () => void;
}
/**
 * useRadio: 用来处理radio逻辑、聚焦、注册到Provider等等
 */
const useRadio = (props: {
  isControlled: boolean;
  /**
   * 传递给input的ref，用于聚焦
   */
  inputRef?: React.MutableRefObject<HTMLInputElement> | ((instance: HTMLInputElement) => void);
  value?: any;
  defaultChecked?: any;
  /**
   * checked: 传入checked把组件变成受控组件
   */
  checked?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  onChange?: (e: React.MouseEvent & { target: EventTarget }) => void;
}): {
  /**
   * checked: 经过受控与非受控处理过后的checked
   */
  checked: boolean;
  setChecked: React.Dispatch<any>;
  /**
   * handleInputRef: 处理后的inputRef，用于传递给组件里的input
   */
  handleInputRef?:
    | React.MutableRefObject<HTMLInputElement>
    | ((instance: HTMLInputElement) => void);
  /**
   * handleChange: 结合onChange，内部对状态处理过了，同时完成聚焦等任务
   */
  handleChange: (e) => void;
  /**
   * RadioGroupContext
   */
  context: typeof RadioGroupContext extends React.Context<infer T> ? T : any;
} => {
  const { inputRef, value, defaultChecked, autoFocus, isControlled, onChange } = props;
  const context = useContext(RadioGroupContext);
  const radioRef = useRef(null);
  const handleInputRef = useForkRef(inputRef, radioRef);
  // 保存原先的value
  const preValue = usePrevious(value);
  const disabled = context?.disabled || props.disabled;
  // 受控与非受控的checked
  const [checked, setChecked] = useControlState(
    isControlled || Boolean(context),
    Boolean(context) ? (context.value || context.defaultValue) === value : props.checked,
    defaultChecked,
  );
  // onChange event.target 返回的值
  const eventTarget: EventTarget = {
    value,
    checked: true,
    name: context?.name || name,
    disabled: context?.disabled || disabled,
    focus: () => radioRef.current?.focus(),
    blur: () => radioRef.current?.blur(),
  };
  const handleChange = useCallback(
    e => {
      e.preventDefault();
      if (disabled) return;
      if (!isControlled) {
        setChecked(true);
      }
      // input获得焦点
      radioRef.current?.focus();
      // 重置e.target内容
      e.target = eventTarget;
      context?.onChange(e);
      onChange?.(e);
    },
    [context, checked, disabled],
  );

  useEffect(() => {
    // mount是选中是否获取焦点
    if (autoFocus && checked) {
      // input获得焦点
      radioRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    context?.regist(eventTarget, preValue);
  }, [value, disabled]);
  return { handleInputRef, handleChange, checked, setChecked, context };
};

export default useRadio;
