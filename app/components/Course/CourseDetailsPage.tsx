import { useGetCourseDetailsQuery } from '@/redux/features/courses/courseApi';
import React, { FC, useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import Heading from '@/app/utils/Heading';
import Header from '../Header';
import Footer from '../Footer';
import CourseDetails from './CourseDetails';
import { useCreatePaymentIntentMutation, useGetStripePublishablkeyQuery } from '@/redux/features/orders/ordersApi';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';

type Props = {
    id:string;
}

const CourseDetailsPage:FC<Props> = ({id}) => {
    const [open, setOpen] = useState(false);
    const [route, setRoute] = useState("Login");
    const {data, isLoading} = useGetCourseDetailsQuery(id);
    const {data: config} = useGetStripePublishablkeyQuery({});
    const [createPaymentIntent, {data:paymentIntentData}] = useCreatePaymentIntentMutation();
    const [stripePromise, setStripePromise] = useState<any>(null);
    const [clientSecret, setClientSecret] = useState('');
    const {user} = useSelector((state:any) => state.auth)

useEffect(()=> {
  if(config){
    const publishablekey = config.publishablekey;
    setStripePromise(loadStripe(publishablekey));
  }
  if(data && user){
    const amount = Math.round(data.course.price * 100);    
    createPaymentIntent(amount);
  }
},[config,data,user])

useEffect(()=> {
  if(paymentIntentData){
    setClientSecret(paymentIntentData?.client_secret);
  }
}, [paymentIntentData])

  return (
    <>
    {
        isLoading ? (
        <Loader/>
        ) : (
         <div>
        <Heading 
          title={`${data?.course?.name} - Elearning`} 
          description="ELearning is a platform for students to learn and get help from teachers" 
          keywords={data?.course?.tags} />
         <Header
            open={open}
            setOpen={setOpen}
            activeItem={1}
            setRoute={setRoute}
            route={route}
            />
            {stripePromise && (
              <CourseDetails
               data={data.course}
               setRoute={setRoute}
               setOpen={setOpen}
               stripePromise={stripePromise}
               clientSecret={clientSecret}
            />
            )}
           
            <Footer/>
         </div>
        )
    }
    </>
  )
}

export default CourseDetailsPage