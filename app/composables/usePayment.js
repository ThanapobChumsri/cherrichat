import { useBackdrop } from "#imports";

const coin_balance = ref(null)

export const usePayment = () => {
  const runtimeConfig = useRuntimeConfig();
  const { open, close } = useBackdrop();
  const { $toast } = useNuxtApp()
  const { t } = useI18n();

  const useGetWallet = async (user_id) => {
    try {
      const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/7d08babd-b462-4c99-98b0-d64457efbf09?user_id=${user_id}`)
      
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
      const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/7d675b86-8dab-4a2b-8c3d-6a512b0298bd?user_id=${user_id}&page=${page}&per_page=${per_page}`)
      
      return response
    } catch (error) {
      $toast.error(t('toast.something_wrong'), String(error?.data?.message || error))
    }
  }

  const useGetTopUpPackage = async () => {
    try {
    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/512d6edf-bee5-4e6b-a3c1-6ca8fcb5a0f7`)

    return response
    } catch (error) {
      $toast.error(t('toast.something_wrong'), String(error?.data?.message || error))
    }
  }

  const useSelectTopUpPackage = async (user_id, package_id) => {
    try {
      open()
      const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/10676008-63f3-4ae1-a452-68359757e5f3`, {
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
      const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/d2304ad9-2505-47a9-88a8-2d9a2e08a427`, {
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