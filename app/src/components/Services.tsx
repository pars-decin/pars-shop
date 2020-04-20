import React from 'react';

import Img from '../components/Img';

interface Props {}

const data = {
  header: 'Služby',
  services: [
    {
      name: 'Dělení materiálu',
      content: 'Vybraný materiál vám po domluvě nadělíme přesně na míru',
      icon: 'materialCutting.svg',
    },
    {
      name: 'Doprava',
      content:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euis',
      icon: 'delivery.svg',
    },
    {
      name: 'Platby kartou',
      content: 'Můžete u nás platit kartami MasterCard a Visa',
      icon: 'payByCard.svg',
    },
  ],
};

const Services: React.FC<Props> = () => {
  return (
    <div className={`services`}>
      <h2>{data.header}</h2>
      <div key={name} className='services__list'>
        {data.services.map(({ name, content, icon }) => (
          <div key={name} className='services__list__item'>
            <Img backgroundSize={`contain`} src={`/icons/${icon}`} />
            <h3>{name}</h3>
            <p>{content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
