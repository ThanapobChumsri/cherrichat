export const useAuth = () => {
  const runtimeConfig = useRuntimeConfig();
  const { $toast } = useNuxtApp()
  const { t } = useI18n();

  const signin = async () => {
    const res = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/auth/google`)
    return res
  } 

  const signout = async (user_id) => {
    try {
      const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/bcdf4d9e-30ce-4cd7-9db0-be3c295936fd?user_id=${user_id || ""}`)
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