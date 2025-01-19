import DefaultTheme from 'vitepress/theme'
import DownloadButton from '../components/DownloadButton.vue'
import ReleaseList from '../components/ReleaseList.vue'
import VersionInfo from '../components/VersionInfo.vue'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('DownloadButton', DownloadButton)
        app.component('ReleaseList', ReleaseList)
        app.component('VersionInfo', VersionInfo)
    }
}