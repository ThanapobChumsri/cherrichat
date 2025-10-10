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

  const signup = async (payload) => {
    try {
      const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/5cbc7022-0f16-44b6-8573-135a1dad54d1`, {
        method: "POST",
        body: payload
      })
      $toast.success(t('signup_success'), t('greeting_email'))
      return response
    } catch (error) {
      $toast.error(t('toast.something_wrong'), error?.data?.message === "email already in use" ? t('email_already_in_use') : String(error?.data?.message || error))
    }
  }

  const signinRegister = async (payload) => {
    try {
      const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/b18cbeb1-ecf3-4c59-8a73-4e008951be6a`, {
        method: "POST",
        body: payload
      })
      $toast.success(t('signin_success'))
      return response
    } catch (error) {
      $toast.error(t('toast.something_wrong'), error?.data?.message === "suspended" ? t('account_suspended') : t('signin_fail'))
    }
  }

  const storeAuthData = (body, name='user-info') => {
    const user_info = {
      user_id: body.user_id || body.id,
      username: body.username,
      email: body.email,
      user_type: body.user_type,
      mode: body?.mode,
    }

    if (process.client) {
      localStorage.setItem(name, JSON.stringify(user_info))
    }

    const userInfoCookie = useCookie(name, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      secure: true,
      sameSite: 'lax',
    })
    userInfoCookie.value = user_info
  }

  const clearAuthData = (name) => {
    if (process.client) {
      localStorage.removeItem(name)
    }

    const userInfoCookie = useCookie(name)
    userInfoCookie.value = null
  }

  return {
    signin,
    signout,
    signinDemo,
    signup,
    signinRegister,
    storeAuthData,
    clearAuthData,
  }
}