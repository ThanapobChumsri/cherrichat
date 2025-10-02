import { useBackdrop } from "#imports";

const coin_balance = ref(null)

export const usePayment = () => {
  const runtimeConfig = useRuntimeConfig();
  const { open, close } = useBackdrop();
  const { $toast } = useNuxtApp()
  const { t } = useI18n();

  const useGetWallet = async (user_id) => {
    try {
      const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/37c05e5b-ce22-4a7d-ab83-f1351d44f7a4?user_id=${user_id}`)
      
      coin_balance.value = Number(response.coin_balance)
    } catch (error) {
      $toast.error(t('toast.something_wrong'), String(error?.data?.message || error))
    }
  }

  const useGetWalletDemo = async (user_id) => {
    try {
      const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/bc76b878-b8d1-4f82-afc4-3c9b83d12176?user_id=${user_id}`)
      
      coin_balance.value = Number(response.coin_balance)
    } catch (error) {
      $toast.error(t('toast.something_wrong'), String(error?.data?.message || error))
    }
  }

  const useGetHistoryPayment = async (user_id, page, per_page) => {
    try {
      const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/8b7bc7e3-5b9d-4675-a488-3c302ea2758c?user_id=${user_id}&page=${page}&per_page=${per_page}`)
      
      return response
    } catch (error) {
      $toast.error(t('toast.something_wrong'), String(error?.data?.message || error))
    }
  }

  const useGetTopUpPackage = async () => {
    try {
    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/4c2191fa-1989-45b5-93db-78de7411ded9`)

    return response
    } catch (error) {
      $toast.error(t('toast.something_wrong'), String(error?.data?.message || error))
    }
  }

  const useSelectTopUpPackage = async (user_id, package_id) => {
    try {
      open()
      const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/da6c8011-4459-4870-9a00-fa86d117c897`, {
        method: 'POST',
        body: {
          user_id: user_id,
          exchange_id: package_id,
        },
      })

      return response
    } catch (error) {
      $toast.error(t('toast.something_wrong'), String(error?.data?.message || error))
      return null
    } finally {
      close()
    }
  }

  const useRedeemCoupon = async (user_id, coupon_code) => {
    try {
      const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/7c2fc6a7-6b16-4a56-babd-7aae70cbe0d8`, {
        method: 'POST',
        body: {
          user_id: user_id,
          coupon_code: coupon_code,
        }
      })

      await useGetWallet(user_id)
      $toast.success('ใช้งานคูปองสำเร็จ', `ได้รับ ${Number(response[0].coin)} เหรียญ`)

      return 1
    } catch (error) {
      $toast.error(t('toast.something_wrong'), String(error?.data?.message || error))
      return null
    }
  }


  return {
    useGetWallet,
    useGetHistoryPayment,
    useGetTopUpPackage,
    useSelectTopUpPackage,
    useRedeemCoupon,
    coin_balance,
    useGetWalletDemo
  }
}