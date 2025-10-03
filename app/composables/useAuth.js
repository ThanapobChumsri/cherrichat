export const useAuth = () => {
  const runtimeConfig = useRuntimeConfig();
  const { $toast } = useNuxtApp()
  const { t } = useI18n();

  const signin = async () => {
    const res = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/6f12e8e4-150c-4319-9abd-3ad2af61c129`)
    return res
  } 

  const signout = async (user_id) => {
    try {
      const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/dd383ba1-12dc-4fe9-b5a9-1a3968d117f8?user_id=${user_id || ""}`)
      return response
    } catch (error) {
      $toast.error(t('toast.something_wrong'), String(error?.data?.message || error))
    }
  }

  const signinDemo = async () => {
    try {
      const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/auth/google/demo`)
      return response
    } catch (error) {
      $toast.error(t('toast.something_wrong'), String(error?.data?.message || error))
    }
  }

  return {
    signin,
    signout,
    signinDemo
  }
}