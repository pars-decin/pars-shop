import React, { ReactElement } from 'react';

import { Formik, Field, Form, useFormik, useField } from 'formik';
import Badge from '../components/Badge';
import Button from '../components/Button';
import strings from '../../helpers/strings';

interface Props {}

function NewInput({ children, required = true, multiline = false, ...props }) {
  const [field, meta] = useField(props.name);
  const hasError = meta.error && meta.touched;
  return (
    <div className={`input-text ${hasError ? `error` : ``}`}>
      <label htmlFor={field.name}>
        {props.label}
        {!!props.hint && <Badge type={`info`}>{props.hint}</Badge>}
        {hasError && (
          <div className={`input-text__error-msg`}>{meta.error}</div>
        )}
      </label>
      {multiline ? <textarea /> : <input required={required} {...props} />}
    </div>
  );
}

function validate(values) {
  const errors = {};
  const {
    name,
    companyName,
    dic,
    email,
    ico,
    phone,
  } = strings.demandForm.errors;
  // name validation
  if (values.name.length === 0) {
    errors['name'] = name;
  }

  // company name validation
  if (values.company.length === 0) {
    errors['company'] = companyName;
  }

  // email & phone validation
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/.test(values.email)) {
    errors['email'] = email;
  }
  if (
    !/^(?:\+\d{1,3}|0\d{1,3}|00\d{1,2})?(?:\s?\(\d+\))?(?:[-\/\s.]|\d)+$/i.test(
      values.phone
    )
  ) {
    errors['phone'] = phone;
  }

  // ico & dic validation
  if (isNaN(values.ico)) {
    errors['ico'] = ico;
  }
  if (isNaN(values.dic)) {
    errors['dic'] = dic;
  }

  return errors;
}

const FieldGroup: React.FC<{
  children: ReactElement | Array<ReactElement>;
  className?: string;
}> = ({ children, className }) => {
  return <div className={`field-group ${className}`}>{children}</div>;
};

function Test({}: Props): ReactElement {
  return (
    <Formik
      validate={validate}
      initialValues={{
        name: '',
        company: '',
        email: '',
        phone: '',
        ico: '',
        dic: '',
        note: '',
      }}
      onSubmit={() => {}}
    >
      {({ values, errors }) => (
        <Form className={`form`}>
          <h2>Osobní údaje</h2>
          <FieldGroup>
            <Field
              label={`Jméno`}
              name={'name'}
              hint={`Lorem ipsum dolor sit amet`}
              as={NewInput}
            />
          </FieldGroup>
          <FieldGroup>
            <Field label={`Firma`} name={'company'} as={NewInput} />
          </FieldGroup>
          <FieldGroup>
            <Field label={`E-mail`} name={'email'} as={NewInput} />
            <Field label={`Telefon`} name={'phone'} as={NewInput} />
          </FieldGroup>
          <FieldGroup>
            <Field label={`IČO`} required={false} name={'ico'} as={NewInput} />
            <Field label={`DIČ`} required={false} name={'dic'} as={NewInput} />
          </FieldGroup>
          <FieldGroup>
            <Field
              label={`Poznámka`}
              name={`note`}
              multiline={true}
              as={NewInput}
            />
          </FieldGroup>
          <Button type={`submit`} className={`btn--primary`}>
            Odeslat
          </Button>

          <pre>{JSON.stringify({ values, errors }, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  );
}

export default Test;
