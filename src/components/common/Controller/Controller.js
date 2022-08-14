const Controller = ({ control, register, name, rules, render }) => {
  const props = register(name, rules);

  return render({
    name: props.name,
    onChange: (e) =>
      props.onChange({
        target: {
          name,
          value: e.target.value,
        },
      }),
    ref: props.ref,
    onBlur: props.onBlur,
  });
};

export default Controller;
