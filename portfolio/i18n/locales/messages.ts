import en_navigation from './en/navigation.json'
import en_contact from './en/contact.json'
import en_global from './en/global.json'
import en_writing from './en/writing.json'

// Single-locale site. The i18n module is kept because the content collections and
// route helpers are built on it, but only English is shipped.
const messages = {
  en: {
    navigation: en_navigation,
    contact: en_contact,
    global: en_global,
    writing: en_writing,
  },
}

export default messages
