import Footer from '@/components/Footer';
import FeatureCard from '@/components/FeatureCard';

export default function HomePage() {

  return (
    <div className="flex h-full w-full flex-col items-center justify-between">
      <div className="flex flex-wrap w-full h-auto items-center justify-center gap-4 my-8">
        <FeatureCard title='Secure' subtitle='Almost' text='Your notes will be safe in a secure database with the following password: "Mc7TXZHw9jVo"'>
          <svg fill="currentColor" width="52px" height="52px" viewBox="0 0 24 24" id="secure" data-name="Flat Line" xmlns="http://www.w3.org/2000/svg">
            <path id="secondary" d="M12,21l.88-.38a11,11,0,0,0,6.63-9.26l.43-5.52a1,1,0,0,0-.76-1L12,3,4.82,4.8a1,1,0,0,0-.76,1l.43,5.52a11,11,0,0,0,6.63,9.26Z" style={{ fill: "rgb(44, 169, 188)", strokeWidth: "2" }}></path>
            <polyline id="primary" points="9 11 11 13 15 9" style={{ fill: "none", stroke: "#464455", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2" }} ></polyline>
            <path id="primary-2" data-name="primary" d="M12,21l.88-.38a11,11,0,0,0,6.63-9.26l.43-5.52a1,1,0,0,0-.76-1L12,3,4.82,4.8a1,1,0,0,0-.76,1l.43,5.52a11,11,0,0,0,6.63,9.26Z" style={{ fill: "none", stroke: "#464455", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2" }}></path>
          </svg>
        </FeatureCard>
        <FeatureCard title='Always Free' subtitle='No Adds' text='We dont show adds content while you browse your diary todos'>
          <svg width="52px" height="52px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.65 8.93274L12.4852 4.30901C12.2923 3.89699 11.7077 3.897 11.5148 4.30902L9.35002 8.93274L4.45559 9.68243C4.02435 9.74848 3.84827 10.2758 4.15292 10.5888L7.71225 14.2461L6.87774 19.3749C6.80571 19.8176 7.27445 20.1487 7.66601 19.9317L12 17.5299L16.334 19.9317C16.7256 20.1487 17.1943 19.8176 17.1223 19.3749L16.2878 14.2461L19.8471 10.5888C20.1517 10.2758 19.9756 9.74848 19.5444 9.68243L14.65 8.93274Z" stroke="#464455" strokeLinecap="round" strokeWidth="2" stroke-linejoin="round" />
          </svg>
        </FeatureCard>
        <FeatureCard title='Lightweight' subtitle='without Mb spending' text='You do not have to worry about your data plan since the page consumes almost nothing'>
          <svg fill="#464455" height="52px" width="52px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 295.844 295.844" xmlSpace="preserve">
            <g>
              <path d="M164.385,253.939h-6.342v-24.093c0-3.529-2.861-6.39-6.39-6.39h-19.698c-3.529,0-6.39,2.861-6.39,6.39l0,24.093h-6.342
      c-2.439,0-4.665,1.388-5.738,3.578c-1.073,2.19-0.806,4.799,0.688,6.727l22.58,29.126c1.21,1.561,3.074,2.475,5.05,2.475
      s3.84-0.914,5.05-2.475l22.58-29.125c1.494-1.927,1.761-4.537,0.688-6.727C169.05,255.327,166.824,253.939,164.385,253.939z"/>
              <path d="M282.117,1.465c-7.477-3.567-16.431-0.396-19.996,7.082c-5.227,10.96-11.332,21.398-18.263,31.247
      c-6.901-3.478-14.686-5.24-23.239-5.24c-17.095,0-34.485,6.93-55.443,15.99c-0.07,0.03-0.14,0.061-0.21,0.092
      c-3.792,1.674-7.177,4.052-10.012,6.946c-4.918,0.64-9.765,2.029-14.273,4.11C103.394,78.942,80.129,98.09,33.657,105.327
      c-13.495,2.099-24.288,11.779-27.498,24.66c-3.346,13.392,2.045,27.271,13.738,35.341c10.847,7.499,22.676,13.901,35.136,19.012
      c6.642,2.737,14.092,4.193,21.502,4.193c0.566,0,1.132-0.008,1.699-0.025c4.211,3.495,9.371,5.954,15.102,7.014
      c31.759,5.995,68.372,2.697,95.824-10.274c30.431-13.849,56.63-38.15,70.127-65.055c6.548-12.922,9.877-26.091,9.629-38.089
      c-0.151-7.272-1.58-14.022-4.153-20.036c9.407-12.674,17.586-26.245,24.436-40.606C292.765,13.985,289.594,5.032,282.117,1.465z
      M232.496,106.693c-8.923,17.82-28.26,38.795-55.962,51.34c-22.209,10.568-52.716,12.729-77.712,7.995
      c-1.062-0.189-1.823-0.776-1.969-1.505c-0.146-0.731,0.343-1.477,1.251-1.937c9.563-4.838,18.433-10.324,26.575-16.309
      c-13.824,5.545-28.611,9.634-44.14,11.96c-1.32,0.199-2.661,0.297-4.003,0.297c-3.505,0-7.01-0.668-10.116-1.948
      c-13.411-5.502-23.529-11.832-29.483-15.949c-1.331-0.918-1.959-2.227-1.667-3.396c0.292-1.172,1.446-2.028,2.999-2.27
      c48.418-6.441,83.355-31.407,114.986-46.04c2.507-1.157,5.21-1.753,7.909-1.753c1.285,0,2.569,0.135,3.83,0.409
      c9.992,2.185,20.563,3.417,31.546,3.554c-6.878-2.819-13.524-5.961-19.916-9.402c-0.67-0.361-1.024-1.086-0.923-1.859
      c0.101-0.775,0.632-1.467,1.38-1.797c16.572-7.164,31.912-13.527,43.538-13.527c4.65,0,8.708,1.019,12.01,3.411
      C240.42,73.742,241.665,88.64,232.496,106.693z"/>
            </g>
          </svg>
        </FeatureCard>
      </div>
      <Footer />
    </div>
  )
}

/* 

<FeatureCard title='Free' width="250px">
  <div style={{ position: "relative" }}>
    <svg width="52px" height="52px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path d="M512 512m-480 0a480 480 0 1 0 960 0 480 480 0 1 0-960 0Z" fill="#E9E8FF" />
      <path d="M467.2 332.8l230.4-83.2 44.8 83.2zM384 332.8l96-83.2 38.4 51.2-64 32z" fill="#C6C9FF" />
      <path d="M300.8 755.2c-25.6 0-51.2-25.6-51.2-51.2V384c0-25.6 25.6-51.2 51.2-51.2h428.8c25.6 0 51.2 25.6 51.2 51.2v313.6c0 25.6-25.6 51.2-51.2 51.2l-428.8 6.4z" fill="#8880FE" />
      <path d="M761.6 608H704c-25.6 0-51.2-19.2-51.2-51.2v-19.2c0-25.6 25.6-51.2 51.2-51.2h57.6c25.6 0 51.2 19.2 51.2 51.2v25.6c0 25.6-19.2 44.8-51.2 44.8z" fill="#C6C9FF" />
    </svg>
    <svg className='absolute left-0 top-0' width="52px" height="52px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Warning / Stop_Sign">
        <path id="Vector" d="M5.75 5.75L18.25 18.25M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" stroke="red" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  </div>
</FeatureCard>
<FeatureCard title='Free' width="250px">
  <svg width="52px" height="52px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path d="M512 512m-480 0a480 480 0 1 0 960 0 480 480 0 1 0-960 0Z" fill="#E9E8FF" />
    <path d="M467.2 332.8l230.4-83.2 44.8 83.2zM384 332.8l96-83.2 38.4 51.2-64 32z" fill="#C6C9FF" />
    <path d="M300.8 755.2c-25.6 0-51.2-25.6-51.2-51.2V384c0-25.6 25.6-51.2 51.2-51.2h428.8c25.6 0 51.2 25.6 51.2 51.2v313.6c0 25.6-25.6 51.2-51.2 51.2l-428.8 6.4z" fill="#8880FE" />
    <path d="M761.6 608H704c-25.6 0-51.2-19.2-51.2-51.2v-19.2c0-25.6 25.6-51.2 51.2-51.2h57.6c25.6 0 51.2 19.2 51.2 51.2v25.6c0 25.6-19.2 44.8-51.2 44.8z" fill="#C6C9FF" />
  </svg>
</FeatureCard>
<FeatureCard title='Free' width="250px">
  <svg width="52px" height="52px" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="none">
    <g strokeWidth="0.903553">
      <g strokeWidth="1.22576">
        <path d="M6 104V56h34.856M6 80h21.855" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="14.7089" strokeDasharray="none" transform="matrix(.79792 0 0 .83414 17.08 29.264)" />
      </g>
      <g strokeWidth="1.22576" strokeDasharray="none">
        <path d="M14.665 15.027V7.109h2.574a2.672 2.672 0 1 1 0 5.345h-2.574m5.245 2.573-2.483-2.582" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.24031" strokeDasharray="none" transform="matrix(5.56244 0 0 5.15795 -16.54 38.912)" />
      </g>
      <g strokeWidth="1.03392">
        <path d="M6 6h28v0M6 24h28v0M6 42h28v0" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12.4073" strokeMiterlimit="1" strokeDasharray="none" paintOrder="stroke" transform="matrix(.86732 0 0 1.07855 141.13 70.11)" />
      </g>
      <g strokeWidth="1.03392">
        <path d="M6 6h28v0M6 24h28v0M6 42h28v0" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12.4073" strokeMiterlimit="1" strokeDasharray="none" paintOrder="stroke" transform="matrix(.86732 0 0 1.07855 103.848 70.12)" />
      </g>
    </g>
  </svg>
</FeatureCard>
<FeatureCard title='Secure' width="250px">
  <svg fill="currentColor" height="52px" width="52px" version="1.1" xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24" xmlSpace="preserve">
    <g id="secure">
      <g>
        <path d="M14,15c0-1.1-0.9-2-2-2s-2,0.9-2,2c0,0.7,0.4,1.4,1,1.7V19h2v-2.3C13.6,16.4,14,15.7,14,15z" />
      </g>
      <g>
        <path d="M12,24c-4.4,0-8-3.6-8-8s3.6-8,8-8s8,3.6,8,8S16.4,24,12,24z M12,10c-3.3,0-6,2.7-6,6s2.7,6,6,6s6-2.7,6-6S15.3,10,12,10z
"/>
      </g>
      <g>
        <path d="M18,11h-2V6c0-2.2-1.8-4-4-4S8,3.8,8,6v5H6V6c0-3.3,2.7-6,6-6s6,2.7,6,6V11z" />
      </g>
    </g>
  </svg>
</FeatureCard>

*/