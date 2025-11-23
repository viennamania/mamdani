'use client';


import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';

import { PiClock, PiEnvelopeSimple } from 'react-icons/pi';
import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';

import { PhoneNumber } from '@/components/ui/phone-input';

import { Input } from '@/components/ui/input';

import Spinner from '@/components/ui/spinner';

///import FormGroup from '@/app/shared-doingdoit/form-group';
import FormGroup from '@/app/shared-doingdoit/form-group-large';


import FormFooter from '@/components/doingdoit/form-footer';





import UploadZone from '@/components/ui/file-upload/upload-zone';
import { countries, roles, timezones } from '@/data/forms/my-details';
import AvatarUpload from '@/components/ui/file-upload/avatar-upload';


import Image from 'next/image';



//import { RadioGroup } from 'rizzui';
import { RadioGroup } from '@/components/ui/radio-group';
import { Radio } from '@/components/ui/radio';



import  { useState, useEffect, useRef, use } from 'react';

import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';




import {
  defaultValues,
  boardFormSchema,
  BoardFormTypes,
} from '@/utils/validators/doingdoit/create-board.schema';


import { Checkbox } from '@/components/ui/checkbox';



import { useSession } from 'next-auth/react';



import TableAvatar from '@/components/ui/avatar-card';

import Tags from "./tags";

import { useForm, FormProvider, SubmitHandler, Controller } from 'react-hook-form';



import {
  CreateProductInput,
  productFormSchema,
} from '@/utils/validators/create-product.schema';

import { zodResolver } from '@hookform/resolvers/zod';


import Uploader from '@/components/doingdoit/upload/uploader';



import Script from 'next/script';
import { MdOutlineDirectionsRailway, MdOutlineDirectionsTransit } from 'react-icons/md';



/*
const SelectBox = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => (
    <div className="grid h-10 place-content-center">
      <Spinner />
    </div>
  ),
});

const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
});
*/

const WysiwygEditor = dynamic(() => import('@/components/ui/toast-editor'), {
  ssr: false,
});




export default function CreateGuide() {

  const { push } = useRouter();


  const [values, setValues] = useState<string[]>([]);
  const [value, setValue] = useState('');



  
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);



  const methods = useForm<CreateProductInput>({
    resolver: zodResolver(productFormSchema),
    
    /////defaultValues: defaultValues(product),

  });





  const { data: session, status } = useSession();

    /* fetch user data from an API
    /api/doingdoit/user/getUser
  */
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [userAvatar, setUserAvatar] = useState('');

  useEffect(() => {
    const fetchData = async () => {

      if (!session?.user?.email) {
        return;
      }

      // Initialize with session data first to prevent hydration mismatch
      setUserEmail(session.user.email);
      setUserName(session.user.name || '');
      setUserAvatar(session.user.image || '');
      
      const res = await fetch(`/api/doingdoit/user/getUserByEmail?_email=${session?.user?.email}`);
      const json = await res?.json();

      //////console.log(json);

      const data = json as any;
      
      if (data.data) {
        setUserId(data.data.id);
        setUserEmail(data.data.email);
        setUserName(data.data.name);
        setUserNickname(data.data.nickname);
        setUserAvatar(data.data.avatar);
      } else {
        //alert(json.message);
      }
    };
    fetchData();
  } , [session?.user?.email, session?.user?.name, session?.user?.image]);



  const [tagList, setTagList] = useState <any[]>([]);



  const [feedImage1, setFeedImage1] = useState<any>(null);
  const [feedImage2, setFeedImage2] = useState<any>(null);
  const [feedImage3, setFeedImage3] = useState<any>(null);
  const [feedImage4, setFeedImage4] = useState<any>(null);
  const [feedImage5, setFeedImage5] = useState<any>(null);
  const [feedImage6, setFeedImage6] = useState<any>(null);
  const [feedImage7, setFeedImage7] = useState<any>(null);
  const [feedImage8, setFeedImage8] = useState<any>(null);
  const [feedImage9, setFeedImage9] = useState<any>(null);
  const [feedImage10, setFeedImage10] = useState<any>(null);




const removeFeedImage = async (imageNumber: number) => {

  // rotate imageNumber
  // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10

  // if imageNumber is 1, then remove imageNumber 1 and move imageNumber 2 to imageNumber 1

  // if imageNumber is 2, then remove imageNumber 2 and move imageNumber 3 to imageNumber 2

  // if imageNumber is 3, then remove imageNumber 3 and move imageNumber 4 to imageNumber 3

  // if imageNumber is 4, then remove imageNumber 4 and move imageNumber 5 to imageNumber 4

  // if imageNumber is 5, then remove imageNumber 5 and move imageNumber 6 to imageNumber 5

  if (imageNumber === 1) {
    setFeedImage1(feedImage2);
    setFeedImage2(feedImage3);
    setFeedImage3(feedImage4);
    setFeedImage4(feedImage5);
    setFeedImage5(feedImage6);
    setFeedImage6(feedImage7);
    setFeedImage7(feedImage8);
    setFeedImage8(feedImage9);
    setFeedImage9(feedImage10);
    setFeedImage10(null);
  } else if (imageNumber === 2) {

    setFeedImage2(feedImage3);
    setFeedImage3(feedImage4);
    setFeedImage4(feedImage5);
    setFeedImage5(feedImage6);
    setFeedImage6(feedImage7);
    setFeedImage7(feedImage8);
    setFeedImage8(feedImage9);
    setFeedImage9(feedImage10);
    setFeedImage10(null);

  } else if (imageNumber === 3) {

    setFeedImage3(feedImage4);
    setFeedImage4(feedImage5);
    setFeedImage5(feedImage6);
    setFeedImage6(feedImage7);
    setFeedImage7(feedImage8);
    setFeedImage8(feedImage9);
    setFeedImage9(feedImage10);
    setFeedImage10(null);

  } else if (imageNumber === 4) {

    setFeedImage4(feedImage5);
    setFeedImage5(feedImage6);
    setFeedImage6(feedImage7);
    setFeedImage7(feedImage8);
    setFeedImage8(feedImage9);
    setFeedImage9(feedImage10);
    setFeedImage10(null);

  } else if (imageNumber === 5) {

    setFeedImage5(feedImage6);
    setFeedImage6(feedImage7);
    setFeedImage7(feedImage8);
    setFeedImage8(feedImage9);
    setFeedImage9(feedImage10);
    setFeedImage10(null);

  } else if (imageNumber === 6) {
      
    setFeedImage6(feedImage7);
    setFeedImage7(feedImage8);
    setFeedImage8(feedImage9);
    setFeedImage9(feedImage10);
    setFeedImage10(null);

  } else if (imageNumber === 7) {

    setFeedImage7(feedImage8);
    setFeedImage8(feedImage9);
    setFeedImage9(feedImage10);
    setFeedImage10(null);

  } else if (imageNumber === 8) {

    setFeedImage8(feedImage9);
    setFeedImage9(feedImage10);
    setFeedImage10(null);

  } else if (imageNumber === 9) {
      
    setFeedImage9(feedImage10);
    setFeedImage10(null);

  } else if (imageNumber === 10) {

    setFeedImage10(null);

  }


}

/* create */
const create  = async (

  title: string,
  content: string,
  tags: string[],
  isTop: string,


) => {



  if (loading) return;
  

  setLoading(true);

  try {

    setError(null);
    
    //////const res = await fetch(`/api/doingdoit/feed/updateFeedById?_id=${_id}&_feedTitle=${feedTitle}&_feedContent=${feedContent}&_name=${userName}&_avatar=${userAvatar}&_nickname=${userNickname}`);


    // updateOneByIdJson
    // post api for updateOneByIdJson

    const params = {
      userId: userId,
      userEmail: userEmail,
      userName: userName,
      userNickname: userNickname,
      userAvatar: userAvatar,
      


      title: title,
      content: content,
      
      images: [
          
        feedImage1,
        feedImage2,
        feedImage3,
        feedImage4,
        feedImage5,
        feedImage6,
        feedImage7,
        feedImage8,
        feedImage9,
        feedImage10,
      ],


      tags: tags,

      isTop: isTop,

    };

    console.log('params: ', params);



    const res = await fetch(`/api/doingdoit/healthinfo/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });



    console.log(' res: ', res);

    if (res.status === 200) {
      const json = await res?.json() as any;

      if (json === undefined) {
        //alert("이메일이 이미 존재합니다.");
        return;
      } else {

        const data = json as any;
    
        if (data)  {
          //alert("구매주문등록이 완료되었습니다.");

          //window.location.href = `/usermain/feeds/${_id}`;

          toast.success(<Text as="b">저장되었습니다.!</Text>);
   
          push(routes.operation.healthinfo);

       


        } else {
          //alert(json.message);
        }    

      }


    }
    else {
      
    }

  
  } catch (e) {
    ///setError(e);
  }
  setLoading(false);

}




const addUploadedImage = async (imageNumber: number, url: string) => {
  try {
    //setUser(null);
    setError(null);



    if (imageNumber === 1) {
      setFeedImage1(url);
    } else if (imageNumber === 2) {
      setFeedImage2(url);
    } else if (imageNumber === 3) {
      setFeedImage3(url);
    } else if (imageNumber === 4) {
      setFeedImage4(url);
    } else if (imageNumber === 5) {
      setFeedImage5(url);
    } else if (imageNumber === 6) {
      setFeedImage6(url);
    }
    else if (imageNumber === 7) {
      setFeedImage7(url);
    }
    else if (imageNumber === 8) {
      setFeedImage8(url);
    }
    else if (imageNumber === 9) {
      setFeedImage9(url);
    }
    else if (imageNumber === 10) {
      setFeedImage10(url);
    }


  } catch (e) {
    ///setError(e);
  }
}

/*
function SmartEditor() {
  const editorRef = useRef(null); // 에디터를 초기화할 DOM을 참조하기 위해 ref 사용

  useEffect(() => {
    const editorElement = editorRef.current; // 현재 DOM 참조 가져오기
    if (editorElement) {
      window.nhn.husky.EZCreator.createInIFrame({
        oAppRef: window.oEditors,
        elPlaceHolder: "smarteditor", // 에디터가 초기화될 요소의 ID
        sSkinURI: "/path/to/SmartEditor2Skin.html", // 에디터 스킨 경로
        fCreator: "createSEditor2"
      });
    }

    // 컴포넌트 언마운트 시 에디터 인스턴스 제거
    return () => {
      if (window.oEditors) {
        window.oEditors.getById["smarteditor"].exec("SE2M_EditingAreaManager").removeAll();
      }
    };
  }, []);

  return (
    <div>
      <textarea id="smarteditor" ref={editorRef}></textarea>
    </div>
  );
}
  */


/*
function SmartEditor() {
  const editorRef = useRef(null); // 에디터를 초기화할 DOM을 참조하기 위해 ref 사용

  useEffect(() => {
    const editorElement = editorRef.current; // 현재 DOM 참조 가져오기
    if (editorElement) {
      (window as any).nhn.husky.EZCreator.createInIFrame({
        oAppRef: (window as any).oEditors,
        elPlaceHolder: "smarteditor", // 에디터가 초기화될 요소의 ID
        sSkinURI: "/se2/SmartEditor2Skin.html", // 에디터 스킨 경로
        fCreator: "createSEditor2"
      });
    }

    // 컴포넌트 언마운트 시 에디터 인스턴스 제거
    return () => {
      if ((window as any).oEditors) {
        ///(window as any).oEditors.getById["smarteditor"].exec("SE2M_EditingAreaManager").removeAll();
      }
    };
  }, []);

  return (
    <div>
      <textarea id="smarteditor" ref={editorRef}></textarea>
    </div>
  );
}
*/

/*
const editorRef = useRef(null); // 에디터를 초기화할 DOM을 참조하기 위해 ref 사용


useEffect(() => {
  const editorElement = editorRef.current; // 현재 DOM 참조 가져오기

  if (editorElement) {

    
    (window as any).nhn.husky.EZCreator.createInIFrame({
      oAppRef: (window as any).oEditors,
      elPlaceHolder: "smarteditor", // 에디터가 초기화될 요소의 ID
      sSkinURI: "/se2/SmartEditor2Skin.html", // 에디터 스킨 경로
      fCreator: "createSEditor2"
    });
    

  }

  // 컴포넌트 언마운트 시 에디터 인스턴스 제거
  return () => {
    if ((window as any).oEditors) {
      ///(window as any).oEditors.getById["smarteditor"].exec("SE2M_EditingAreaManager").removeAll();
    }
  };

}, [ editorRef ]);
*/








/*
<textarea
                    id="editorTxt"
get ref of the textarea
*/

//const editor = document.getElementById('editorTxt');

//console.log('editor: ', editor);

// get content of the textarea

//const content = (editor as HTMLTextAreaElement)?.value;

//console.log('content: ', content);








// 에디터의 내용에 대한 값 검증은 이곳에서 처리합니다.

///var sHTML = oEditor.getById["editorTxt"].getIR(); // 에디터의 내용 가져오기.

//const sHTML = editor. // 에디터의 내용 가져오기.

//const sHTML = '';


// 에디터의 내용에 대한 값 검증은 이곳에서 처리합니다.





  ///const editorRef = useRef(null); // 에디터를 초기화할 DOM을 참조하기 위해 ref 사용

  /*
  useEffect(() => {
    const editorElement = editorRef.current; // 현재 DOM 참조 가져오기
    if (editorElement) {
      window.nhn.husky.EZCreator.createInIFrame({
        oAppRef: window.oEditors,
        elPlaceHolder: "smarteditor", // 에디터가 초기화될 요소의 ID
        sSkinURI: "/path/to/SmartEditor2Skin.html", // 에디터 스킨 경로
        fCreator: "createSEditor2"
      });
    }

    // 컴포넌트 언마운트 시 에디터 인스턴스 제거
    return () => {
      if (window.oEditors) {
        window.oEditors.getById["smarteditor"].exec("SE2M_EditingAreaManager").removeAll();
      }
    };
  }, []);
  */
 







  const onSubmit: SubmitHandler<BoardFormTypes> = (data) => {

    const { title, content, isTop } = data as any;

  
    // 현재 DOM 참조 가져오기
    //const editorElement = editorRef.current as any;

    //console.log('editorElement: ', editorElement);


    ///editorElement?.exec("UPDATE_CONTENTS_FIELD", []); // 에디터의 내용이 textarea에 적용됩니다.


    ///let content = editorElement?.getIR(); // 에디터의 내용 가져오기.

    //let content = editorElement?.value;

    //console.log('content: ', content);

    //const smarteditor =  (window as any).oEditors.getById["smarteditor"].exec("SE2M_EditingAreaManager");

  
    ///const content = (window as any).oEditors.getById["smarteditor"].getIR();

    ///console.log('content: ', content);

    
    
    //create(title as string, content as string, tagList as any,
    //  isTop ? 'Y' : 'N',
    //);
    
    // Use tagList state instead of form data for tags
    create(title, content, tagList || [],
      isTop ? 'Y' : 'N',
      );



    //alert('content: ' + content);

    ///alert(sHTML);


    //console.log('Guide data ->', {
    //  ...data,
    //});

    /// oEditor.getById["editorTxt"].exec("UPDATE_CONTENTS_FIELD", []); // 에디터의 내용이 textarea에 적용됩니다.

    // 에디터의 내용에 대한 값 검증은 이곳에서 처리합니다.

    ///var sHTML = oEditor.getById["editorTxt"].getIR(); // 에디터의 내용 가져오기.






    
  };

  // Prevent hydration mismatch by waiting for session to load
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    
    <Form<BoardFormTypes>
      validationSchema={boardFormSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className='@container'
      useFormProps={{
        mode: 'onChange',
        defaultValues,
      }}
    >

      {({ register, control, setValue, getValues, formState: { errors } }) => {


        return (
          <>

            {/*
            <script type="text/javascript" src="../se2/js/service/HuskyEZCreator.js" charset="utf-8"></script>
            */}

            {/*
            <Script src="/se2/js/service/HuskyEZCreator.js" />
            
            <Script id="editorScript" strategy="lazyOnload">
              {`
              var oEditors = [];
              var oAppRef = oEditors;

              //smarteditor = function() {

                nhn.husky.EZCreator.createInIFrame({
                  oAppRef: oAppRef,
                  elPlaceHolder: "smarteditor",
                  sSkinURI: "/se2/SmartEditor2Skin.html",
                  fCreator: "createSEditor2"
                });
             
              //}

              //$(document).ready(function() {
              //  smarteditor();
              //} );

              //smarteditor();

              //window.onload = function() {
              //  smarteditor();
              //}

              // document ready
              // $ is a shorthand for jQuery, so you can use jQuery instead of $.
              // use not $ but jQuery

              //jQuery(document).ready(function() {
              //  smarteditor();
              //}

               



              `}
            </Script>
            */}
            
            


            {/*
             <Script
          s   rc="js경로"
          afterInteractive
          beforeInteractive
              strategy="lazyOnload"
              />
            */}

            
            <div className=" mb-10 grid divide-y divide-solid divide-gray-200 border rounded-lg ">

              
              <FormGroup
                title="작성자"
                
              >
                {/*
                <Text as="b">
                
                  <TableAvatar
                    src={userAvatar as string}
                    name={userNickname as string}
                    description={userEmail}
                  />
                
                </Text>
                */}
                {/*
                <div className="flex items-center">
                  <Image
                    src={userAvatar || '/avatar.svg'}
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-bold">{userNickname || '익명'}</p>
                    <p className="text-sm text-gray-500">{userEmail}</p>
                  </div>
                </div>
                */}
                
                <TableAvatar
                  src={userAvatar as string}
                  name={userNickname as string || '익명'}
                  description={userEmail}
                />
                
              </FormGroup>
              

              
              <FormGroup
                title="상단고정"
                
              >
                <Controller
                  control={control}
                  name="isTop"
                  render={({ field: { onChange, value } }) => (
                    <Checkbox
                      variant="flat"
                      aria-label={'isTop'}
                      className="cursor-pointer"
                      //color='primary'
                      checked={value}
                      onChange={onChange}
                    />
                  )}
                />
  
              </FormGroup>

              
              <FormGroup
                title="제목"
                
              >

                  <Controller
                    control={control}
                    name="title"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        value={value}
                        onChange={onChange}
                        placeholder="제목을 입력해 주세요."
                        className="w-full"
                      />
                    )}
                    // check if bio has 30 characters
                    rules={{

                      //validate: (v) =>  (v as string).length <= 30 || '30자 이내로 입력해주세요.',

                      //maxLength: 30,
                     

                    }}
                    
                    //display counter of characters
                  />

              </FormGroup>

              
              <FormGroup
                title="이미지" 
              >
                <div className="flex flex-row items-center justify-start xl:w-[800px]">

                  { !feedImage1 ? (
                    <div className="flex flex-wrap gap-2">
                      <Uploader
                        onSave={(url: string) => {
                          addUploadedImage(1, url);
                        }}
                      />
                    </div>
                  ) : (
                    <div className='flex flex-wrap gap-2'>
                      <div className="flex flex-col items-center justify-center ">
                        <Image
                          src={feedImage1}
                          alt="image"
                          width={150}
                          height={150}
                          className="relative w-20 h-20 rounded-sm overflow-hidden shrink-0"
                          style={{objectFit: 'cover'}}
                        />

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              removeFeedImage(1);
                            }}
                          >
                            x
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                
                </div>
              </FormGroup>
              

          
              
              <FormGroup
                title="태그"
                
              >

                <FormProvider {...methods}>
                  <form>

                    <Tags
                      //feedTagsWidth="unset"
                      //feedTagsAlignSelf="stretch"

                      tagAdd={(tag: string) => {
                        console.log('tagAdd: ', tag);

                        // check if tag is already in tags
                        ///const isTagInTags = tags.includes(tag);

                        var isTagInTags = false;

                        tagList.map((item:string) => {
                          if (item === tag) {
                            isTagInTags = true;
                          }
                        } );


                        if (!isTagInTags) {

                          console.log('tagAdd: ', tag);


                          const newTags = [...tagList, tag];

                          console.log('========newTags: ', newTags);

                          setTagList(newTags);

                        }

                        console.log('========tagList: ', tagList);  

                      } }



                      tagRemove={(tag: string) => {
                        console.log('tagRemove: ', tag);

                        const updatedTags = tagList.filter((item:string) => item !== tag);
                        setTagList(updatedTags);

                        
                      } }

                    />

                  </form>
                </FormProvider>


              </FormGroup>
              


              <FormGroup
                title="내용"
                
              >
     
                <WysiwygEditor

                  initialValue={''}
                  
                  //ref={editorRef}

                  handleSubmit={
                    (updatedContent: string) => {
                      
                      //console.log('updatedContent', updatedContent)

                      ///setContent(content);

                      setValue('content', updatedContent);

                      
                      // Create form data with safe values
                      const formValues = getValues();
                      const safeFormData = {
                        ...formValues,
                        content: updatedContent,
                        // Don't include tags from form, we'll use tagList state instead
                      };
                      
                      onSubmit(safeFormData);

                    }
                  }

                />
                
              </FormGroup>
              


            </div>
            


          </>



        );


      }}
      
    </Form>
  

      
  
  );
}
