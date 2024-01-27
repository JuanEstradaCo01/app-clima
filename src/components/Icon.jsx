function Icon(icono) {
  switch (icono) {
    case 'Thunderstorm':
      icono = 'iconos/thunderstorms-rain.svg'
      break;
    case 'Drizzle':
      icono = 'iconos/drizzle.svg'
      break;
    case 'Rain':
      icono = 'iconos/rain.svg'
      break;
    case 'Snow':
      icono = 'iconos/snow.svg'
      break;
    case 'Clear':
      icono = 'iconos/clear-day.svg'
      break;
    case 'Atmosphere':
      icono = 'iconos/horizon.svg'
      break;
    case 'Clouds':
      icono = 'iconos/fog.svg'
      break;
    case 'Fog':
      icono = 'iconos/fog.svg'
      break;
    case 'Haze':
      icono = 'iconos/haze.svg'
      break;
    case 'Smoke':
      icono = 'iconos/smoke.svg'
      break;
    default:
      icono = 'iconos/clear-day.svg'
  }
  return icono
}

export default Icon