import { useState } from 'react';
import { useForm } from "react-hook-form"
import { Button, Field, Image, Input } from '@fluentui/react-components';
import { useStyles } from './Signup.styles';
import { useAuth } from '../../hooks/AuthProvider';

interface User {
    username: string;
    email: string;
    pwd: string;
    learnstyle?: string;
}

const Signup = () => {

    const styles = useStyles();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<User>({mode:'onChange'})

    const onSubmit = (data:User) => {          
    }

  return (
    <div className={styles.root}>

      <div className={styles.body}>

        <div className={styles.header}>
          <h2 className={styles.h2}>Welcome!</h2>
          <p className={styles.p}>Create your account to get started</p>
        </div>

        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

            <Field
              label="Username"
              validationState={errors.username && "error"}
              validationMessage={errors.username?.message as string}
              required
            >
              <Input
                {...register('username',
                  {
                    required: { value: true, message: "Please enter username" },
                    min: { value: 1, message: "Please enter valid name" },
                  })}
              />
            </Field>

            <Field
              label="Email"
              validationState={errors.email && "error"}
              validationMessage={errors.email?.message as string}
              required
            >
              <Input
                type='email'
                {...register('email',
                  {
                    required: { value: true, message: "Please enter email" },
                    pattern: { value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, message: "Please enter valid email" },
                  })}
              />
            </Field>

            <Field
              label="Password"
              validationState={errors.pwd && "error"}
              validationMessage={errors.pwd?.message as string}
              required
            >
              <Input
                type='password'
                {...register('pwd',
                  {
                    required: { value: true, message: "Please enter password" },
                    min: { value: 8, message: "Please enter a minimum of 8 characters" },
                    pattern: { value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, message: "Password must contain a minimum of 8 characters, a symbol, a number & upper and lower case characters" }
                  })}
              />
            </Field>

            <Button className={styles.button} type="submit">Sign up</Button>

           
          </form>
        </div>

      </div>

      <div>
        <Image
          alt="signup image"
          src="https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80"
          height={600}
          width={700}
        />
      </div>


    </div>


  )
}

export default Signup