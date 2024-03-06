import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from "react-hook-form"
import { Button, Field, Image, Input } from '@fluentui/react-components';
import { makeStyles, tokens, shorthands } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    height: '80%',
    width: '60%',
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'left',
    ...shorthands.margin('5%', '18%', '5%', '18%'),
    ...shorthands.padding('2%'),
    ...shorthands.gap('32px')
  },
  header: {
    height: '10%'
  },
  h2: {
    height: '24px',
    ...shorthands.margin(0),
  },
  p: {
    height: '20px',
    width: '100%',
    ...shorthands.margin(0),
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('32px'),
    ...shorthands.flex(1),

  },
  formContainer: {
    width: '100%',
  },
  form:{
    display:'flex',
    flexDirection:'column',
    ...shorthands.gap('16px'),
  },
  button:{
    ...shorthands.margin('5%','0%'),
    backgroundColor:tokens.colorBrandBackgroundInvertedHover,
    borderBlockColor:tokens.colorBrandBackgroundInvertedHover,
    boxShadow: tokens.shadow4,

  }
}
)


const App = () => {

  const [data, setData] = useState<Array<Object>>([]);
  const styles = useStyles();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({mode:'onChange'})
  const onSubmit = (data) => {
    console.log(data)
    setData(data)
  }
  console.log(data)


  // useEffect(() => {
  //   axios.get('http://127.0.0.1:8000/students/')
  //     .then(response => {
  //       setData(response.data.students);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);

  // useEffect(() => {
  //   axios.post('http://127.0.0.1:8000/students/signup/', data)
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }, [data]);

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

export default App