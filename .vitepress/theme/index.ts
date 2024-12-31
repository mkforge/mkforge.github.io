import DefaultTheme from 'vitepress/theme'
import DownloadButton from '../components/DownloadButton.vue'
import ReleaseList from '../components/ReleaseList.vue'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('DownloadButton', DownloadButton)
        app.component('ReleaseList', ReleaseList)
    }
}