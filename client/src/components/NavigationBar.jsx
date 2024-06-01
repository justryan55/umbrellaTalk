import { Link } from 'react-router-dom'
import umbrellaLogo from '../assets/images/umbrella.svg'
import messageIcon from '../assets/images/message-square.svg'
import profileIcon from '../assets/images/profile.svg'
import favouriteIcon from '../assets/images/favourite.svg'
import settingIcon from '../assets/images/settings.svg'
import logoutIcon from '../assets/images/logout.svg'
import LogoutButton from './LogoutButton'


const NavigationBar = () => {
  return (
    <div className='navigation'>
        <img src={umbrellaLogo} alt='logo' className='logo' />
        <img src={messageIcon} alt='message-icon' />
        <img src={profileIcon} alt='profile-icon' />
        <img src={favouriteIcon} alt='favourite-icon' />
        <img src={settingIcon} alt='settings-icon' />
        <LogoutButton />
    </div>
  )
}

export default NavigationBar