import React from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import View from '../components/View';
import { DataProvider } from '../hocs/dataContext';
import Button from '../components/Button';
import { Form as form, Field, Formik, Form } from 'formik';
import FieldGroup from '../components/FieldGroup';
import strings from '../../helpers/strings';
import TextInput from '../components/TextInput';
import Cart from '../components/Cart';
import Link from '../components/Link';

interface Props {}

function validate(values) {
  const errors = {};
  const {
    name,
    companyName,
    dic,
    generic,
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

  // check cart items for errors
  for (const item in values.items) {
    const curr = values.items[item];
    if (
      isNaN(curr.length) ||
      curr.length < 0 ||
      isNaN(curr.no) ||
      curr.no < 0
    ) {
      errors['items'] = {
        // @ts-ignore
        ...errors.items,
        [item]: {
          length: generic,
          no: generic,
        },
      };
    }
  }

  return errors;
}

const Demand: React.FC<Props> = () => {
  const [varioIds, setVarioIds] = React.useState([]);
  const [cookies, setCookies, removeCookies] = useCookies();

  React.useEffect(() => {
    setVarioIds(cookies.parsCart || []);
  }, [cookies.parsCart]);

  const removeItem = (varioId) => {
    setCookies(
      'parsCart',
      cookies.parsCart.filter((x) => x !== varioId)
    );
    // @ts-ignore
    window.updateDemandBadge();
  };

  return (
    <View className={`demand-view`}>
      <div className={`demand-container`}>
        <div className={`demand-container__intro`}>
          <h1>Poptávka</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euis. Lorem ipsum dolor sit amet, consectetuer
            adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
            dolore magna aliquam erat volutpat.
          </p>
        </div>
        <div className={`demand-container__content`}>
          {varioIds.length !== 0 ? (
            <Formik
              // key={JSON.stringify(varioIds)}
              validate={validate}
              initialValues={{
                name: '',
                company: '',
                email: '',
                phone: '',
                ico: '',
                dic: '',
                note: '',
                items: varioIds.reduce((acc, curr) => {
                  return {
                    ...acc,
                    [curr]: {
                      length: 0,
                      no: 0,
                    },
                  };
                }, []),
              }}
              onSubmit={(values, actions) => {
                axios
                  .post(
                    'https://pars-shop-server.dominiktomcik23.now.sh/send',
                    {
                      values,
                    }
                  )
                  .then((res) => {
                    if (res.status === 200) {
                      actions.resetForm();
                      removeCookies('parsCart');
                      // @ts-ignore
                      window.updateDemandBadge();
                      window.scrollTo(0, 0);
                    }
                  });
              }}
            >
              {() => (
                <Form className={`form`}>
                  {/* <h2>Produkty</h2> */}
                  <Cart varioIds={varioIds} removeItem={removeItem} />
                  <h2>Osobní údaje</h2>
                  <FieldGroup>
                    <Field
                      label={`Jméno`}
                      name={'name'}
                      hint={`Lorem ipsum dolor sit amet`}
                      as={TextInput}
                    />
                  </FieldGroup>
                  <FieldGroup>
                    <Field label={`Firma`} name={'company'} as={TextInput} />
                  </FieldGroup>
                  <FieldGroup>
                    <Field label={`E-mail`} name={'email'} as={TextInput} />
                    <Field label={`Telefon`} name={'phone'} as={TextInput} />
                  </FieldGroup>
                  <FieldGroup>
                    <Field
                      label={`IČO`}
                      required={false}
                      name={'ico'}
                      as={TextInput}
                    />
                    <Field
                      label={`DIČ`}
                      required={false}
                      name={'dic'}
                      as={TextInput}
                    />
                  </FieldGroup>
                  <FieldGroup>
                    <Field
                      label={`Poznámka`}
                      name={`note`}
                      multiline={true}
                      as={TextInput}
                    />
                  </FieldGroup>
                  <Button type={`submit`} className={`btn--primary`}>
                    Odeslat
                  </Button>

                  {/* <pre>{JSON.stringify({ values, errors }, null, 2)}</pre> */}
                </Form>
              )}
            </Formik>
          ) : (
            <p>
              V košíku nejsou žádné položky.{' '}
              <Link target={`_self`} url={`/products`}>
                Přejít na produkty
              </Link>
            </p>
          )}
        </div>
      </div>
    </View>
  );
};

export default Demand;
