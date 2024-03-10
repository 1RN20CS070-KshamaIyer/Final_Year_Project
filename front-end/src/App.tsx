import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from "react-hook-form"
import { Button, Card, Field, Image, Input, mergeClasses } from '@fluentui/react-components';
import { makeStyles, tokens, shorthands } from '@fluentui/react-components';
import PdfViewer from './components/PDFViewer';
import pdflink from './assets/aaecd97cf8ca45b0a1a7d21ff1405235.pdf'
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('16px'),
  },
  button: {
    ...shorthands.margin('5%', '0%'),
    backgroundColor: tokens.colorBrandBackgroundInvertedHover,
    borderBlockColor: tokens.colorBrandBackgroundInvertedHover,
    boxShadow: tokens.shadow4,

  },
  card: {
    ...shorthands.padding('2%', '10%'),
    boxShadow: tokens.shadow4,
    alignItems: 'center'
  },
  success: {
    backgroundColor: tokens.colorStatusSuccessBackground1,
    color: tokens.colorStatusSuccessForeground1,
  },
  error: {
    backgroundColor: tokens.colorStatusDangerBackground1,
    color: tokens.colorStatusDangerForeground1,
  }
}
)


const App = () => {

  const [list, setList] = useState<Array<Object>>([]);
  const [data, setData] = useState<Array<Object>>([]);
  const [err, setErr] = useState<boolean>(false)
  const styles = useStyles();

  const s3Url = 'https://readingm.s3.ap-south-1.amazonaws.com/aaecd97cf8ca45b0a1a7d21ff1405235.pdf'; // Replace with your actual S3 URL


  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({mode:'onChange'})
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    const validate = list.find(
      (item) => item.username === data.username && item.email === data.email && item.pwd === data.pwd
    );
    if (!validate) {
      setErr(true)
    }
    else {
      setErr(false)
    }
    setData(data)
  }

  const onClick = React.useCallback(() => console.log("Interactive!"), []);


  // useEffect(() => {
  //   axios.get('http://127.0.0.1:8000/students/')
  //     .then(response => {
  //       setList(response.data.students);
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

  // useEffect(() => {
  //   axios.post('http://127.0.0.1:8000/students/login/', data)
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }, [data]);


  return (
    // <div className={styles.root}>

    //   <div className={styles.body}>

    //     <div className={styles.header}>
    //       <h2 className={styles.h2}>Welcome!</h2>
    //       {/* <p className={styles.p}>Create your account to get started</p> */}
    //       <p className={styles.p}>Log in to get started</p>
    //     </div>

    //     <div className={styles.formContainer}>
    //       <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

    //         {/* <Field
    //           label="Username"
    //           validationState={errors.username && "error"}
    //           validationMessage={errors.username?.message as string}
    //           required
    //         >
    //           <Input
    //             {...register('username',
    //               {
    //                 required: { value: true, message: "Please enter username" },
    //                 min: { value: 1, message: "Please enter valid name" },
    //               })}
    //           />
    //         </Field>

    //         <Field
    //           label="Email"
    //           validationState={errors.email && "error"}
    //           validationMessage={errors.email?.message as string}
    //           required
    //         >
    //           <Input
    //             type='email'
    //             {...register('email',
    //               {
    //                 required: { value: true, message: "Please enter email" },
    //                 pattern: { value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, message: "Please enter valid email" },
    //               })}
    //           />
    //         </Field>

    //         <Field
    //           label="Password"
    //           validationState={errors.pwd && "error"}
    //           validationMessage={errors.pwd?.message as string}
    //           required
    //         >
    //           <Input
    //             type='password'
    //             {...register('pwd',
    //               {
    //                 required: { value: true, message: "Please enter password" },
    //                 min: { value: 8, message: "Please enter a minimum of 8 characters" },
    //                 pattern: { value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, message: "Password must contain a minimum of 8 characters, a symbol, a number & upper and lower case characters" }
    //               })}
    //           />
    //         </Field>

    //         <Button className={styles.button} type="submit">Sign up</Button> */}

    //         <Field
    //           label="Username"
    //           validationState={errors.username && "error"}
    //           validationMessage={errors.username?.message as string}
    //           required
    //         >
    //           <Input
    //             {...register('username',
    //               {
    //                 required: { value: true, message: "Please enter username" },
    //                 // min: { value: 1, message: "Please enter valid name" },
    //               })}
    //           />
    //         </Field>

    //         <Field
    //           label="Email"
    //           validationState={errors.email && "error"}
    //           validationMessage={errors.email?.message as string}
    //           required
    //         >
    //           <Input
    //             type='email'
    //             {...register('email',
    //               {
    //                 required: { value: true, message: "Please enter email" },
    //                 // pattern: { value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, message: "Please enter valid email" },
    //               })}
    //           />
    //         </Field>

    //         <Field
    //           label="Password"
    //           validationState={errors.pwd && "error"}
    //           validationMessage={errors.pwd?.message as string}
    //           required
    //         >
    //           <Input
    //             type='password'
    //             {...register('pwd',
    //               {
    //                 required: { value: true, message: "Please enter password" },
    //                 // min: { value: 8, message: "Please enter a minimum of 8 characters" },
    //                 // pattern: { value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, message: "Password must contain a minimum of 8 characters, a symbol, a number & upper and lower case characters" }
    //               })}
    //           />
    //         </Field>

    //         <Button className={styles.button} type="submit">Log in</Button>

    //         {err && <Card className={mergeClasses(styles.card, styles.error)} appearance='filled-alternative' ><p>Invalid Credentials</p></Card> : <Card className={mergeClasses(styles.card, styles.success)} appearance='filled-alternative' ><p>Login Successful!</p></Card>}

    //       </form>
    //     </div>

    //   </div>

    //   <div>
    //     <Image
    //       alt="signup image"
    //       src="https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80"
    //       height={600}
    //       width={700}
    //     />
    //   </div>


    // </div>
    <div>
    <PdfViewer s3Url={s3Url} />
  </div>
  )
}

export default App