import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import DownloadButton from '../components/DownloadButton.vue'
import ReleaseList from '../components/ReleaseList.vue'
import VersionInfo from '../components/VersionInfo.vue'
import VersionBanner from '../components/VersionBanner.vue'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('DownloadButton', DownloadButton)
        app.component('ReleaseList', ReleaseList)
        app.component('VersionInfo', VersionInfo)
        app.component('VersionBanner', VersionBanner)
    },
    Layout() {
        return h(DefaultTheme.Layout, null, {
            'layout-top': () => h(VersionBanner)
        })
    }
}