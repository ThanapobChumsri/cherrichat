import { defineNuxtPlugin } from '#app'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

// ✅ ลงทะเบียนเฉพาะสิ่งที่ใช้ เพื่อลด bundle
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export default defineNuxtPlugin(() => {
  // สามารถใส่ config global ได้ที่นี่ถ้าต้องการ
  // ChartJS.defaults.font.family = 'Inter, system-ui, ...'
})