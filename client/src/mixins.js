import moment from "moment"
import AOS from 'aos'
import 'aos/dist/aos.css'

const Mixins = {
  mounted() {
    AOS.init({ })
  },
  methods: {
    DateFormat(item) {
      return moment(item).locale('id').format('L, LTS')
    },
    DateFormatAgo(item) {
      return moment(item).locale('id').fromNow()
    },
    NumberFormat(num) {
      return Number(num).toLocaleString()
    },
    countDown(expiredToken) {
      return new Date(expiredToken) - new Date()
    },
  },
}

export default Mixins