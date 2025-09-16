import { Button } from '@inu/ui/components/button'
import { Input } from '@inu/ui/components/input'
import { Label } from '@inu/ui/components/label'
import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { useForm } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'
import * as v from 'valibot'
import { authClient } from '@/clients/authClient'
import FormFieldInfo from '@/routes/-components/common/form-field-info'
import Spinner from '@/routes/-components/common/spinner'

const FormSchema = v.object({
  email: v.pipe(v.string(), v.email('Please enter a valid email address')),
  password: v.pipe(
    v.string(),
    v.minLength(8, 'Password must be at least 8 characters')
  )
})

export default function LoginCredentialsForm() {
  const navigate = useNavigate()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const form = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    validators: {
      onChange: FormSchema
    },
    onSubmit: async ({ value }) => {
      const { error } = await authClient.signIn.email(
        {
          email: value.email,
          password: value.password
        },
        {
          onSuccess: () => {
            navigate({ to: '/' })
          }
        }
      )
      if (error) {
        toast.error(error.message ?? JSON.stringify(error))
      }
    }
  })

  return (
    <form
      className='flex flex-col gap-y-3'
      onSubmit={e => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <div>
        <form.Field
          name='email'
          children={field => {
            return (
              <>
                <Label htmlFor={field.name}>Email</Label>
                <Input
                  className='mt-1'
                  id={field.name}
                  type='email'
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={e => field.handleChange(e.target.value)}
                />
                <FormFieldInfo field={field} />
              </>
            )
          }}
        />
      </div>
      <div>
        <form.Field
          name='password'
          children={field => (
            <>
              <Label htmlFor={field.name}>Password</Label>
              <>
                <div className='relative flex w-full items-center justify-end'>
                  <Input
                    className='mt-1'
                    id={field.name}
                    type={isPasswordVisible ? 'text' : 'password'}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                  />
                  <Button
                    className='absolute mr-2 h-7 w-7 rounded-full'
                    type='button'
                    tabIndex={-1}
                    variant='ghost'
                    size='icon'
                    onClick={e => {
                      e.preventDefault()
                      setIsPasswordVisible(!isPasswordVisible)
                    }}
                  >
                    {isPasswordVisible ? <EyeOpenIcon /> : <EyeNoneIcon />}
                  </Button>
                </div>
                <FormFieldInfo field={field} />
              </>
            </>
          )}
        />
      </div>
      <form.Subscribe
        selector={state => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button type='submit' disabled={!canSubmit} className='mt-3 h-12'>
            {isSubmitting ? <Spinner /> : 'Log in'}
          </Button>
        )}
      />
    </form>
  )
}
