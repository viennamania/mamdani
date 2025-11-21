import { Editor } from '@toast-ui/react-editor'



import { useEffect, useRef, useState } from 'react'

//import { WriteContainer, WriteTitle, WriteBtn, WriteEditor } from './Write.style'

//import { useRouter } from 'next/router'

//import { apiInstance } from '../../../apis/setting'

//import { toast } from 'react-toastify'

import { useSelector } from 'react-redux'

//import { RootState } from '../../../store/store'


import { BlobResult } from '@vercel/blob'




import '@toast-ui/editor/dist/toastui-editor.css';


// Color Syntax Plugin
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";



import { Button } from '@/components/ui/button';

//import youtubeLogo from '@/assets/images/youtube-icon.png';

///import youtubeLogo from '../assets/images/youtube-icon.png';

// /Users/nevertry/partswallet/granderby/dev/doingdoit/fullstack/src/app/assets/images/youtube-icon.png


//import youtubeLogo from '@/assets/images/youtube-icon.png';


const youtubeLogo = '/images/youtube-icon.png';


// Table Merged Cell Plugin
//import "@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css";

//import tableMergedCell from "@toast-ui/editor-plugin-table-merged-cell";



const colorSyntaxOptions = {
  preset: [
    "#333333", "#666666", "#FFFFFF", "#EE2323", "#F89009", "#009A87", "#006DD7", "#8A3DB6",
    "#781B33", "#5733B1", "#953B34", "#FFC1C8", "#FFC9AF", "#9FEEC3", "#99CEFA", "#C1BEF9",
  ],
};



//import EditCategoryPage from '@/app/(hydrogen)/ecommerce/categories/[id]/edit/page';
//import { text } from 'stream/consumers';



// useRef parameter
/*
<WysiwygEditor
    ref={editorRef}

/>
*/

const WysiwygEditor = ({
    initialValue,
    //ref,
    handleSubmit,
}: {
    initialValue: string,
    //ref: React.RefObject<Editor>,
    handleSubmit: (

        updatedContent: string,


    ) => void
}) => {


    console.log('initialValue', initialValue);





    const [image, setImage] = useState(''); // 이미지
    
    //const router = useRouter()

    //const [title, setTitle] = useState('') // 제목

    const editorRef = useRef(null);


    useEffect(() => {

        const editorIns = (editorRef.current as Editor | null)?.getInstance();
        //editorIns?.setMarkdown(initialValue);
        editorIns?.setHTML(initialValue);

    } , [initialValue])
 



    // language 설정
    const language = {
        language: 'ko',
        usageStatistics: false,
    }

    // 툴바 설정
    const toolbarItems = [
        ['heading', 'bold', 'italic', 'strike'],
        ['hr', 'quote'],
        ['ul', 'ol', 'task', 'indent', 'outdent'],
        ['table', 'image', 'link'],
       

        //['youtube'],
        ['code', 'codeblock'],
        //['scrollSync'],
        //['colorSyntax'],


        //['scrollSync']
    ]
    
    //const userIdx = useSelector((state: RootState) => state.idx.idx)

    // 제목 설정
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        //setTitle(value)
    }

    // 이미지 업로드
    const onUploadImage = async (blob: any, callback: any) => {
        // blob은 base64 인코딩된 이미지 파일
        // formData에 담아 서버로 보내고, 서버에서는 s3에 이미지 저장후 s3에서 url을 받아 다시 프론트로 값 전송
        const formData = new FormData()
        formData.append('image', blob)

        // 이미지 업로드

        //alert('이미지 업로드');


        /*
        fetch('/api/upload', {
            method: 'POST',
            headers: { 'content-type': file?.type || 'application/octet-stream' },
            body: file,
          }).then(async (res) => {
      
            if (res.status === 200) {
              const { url } = (await res?.json()) as BlobResult

                callback(url, 'alt text')
            }

            }).catch((err) => {
                console.error(err)
                })
        */

        
        fetch('/api/upload', {
            method: 'POST',
            headers: { 'content-type': blob?.type || 'application/octet-stream' },
            body: blob,
          }).then(async (res) => {
      
            if (res.status === 200) {
                const { url } = (await res?.json()) as BlobResult

                setImage(url)

                callback(url, 'image')
            }

            const editorIns = (editorRef.current as Editor | null)?.getInstance();
            editorIns?.eventEmitter.emit('closePopup');

        }).catch((err) => {
            console.error(err)
        })


        /*
        try {
            const imageRes = await apiInstance.post('/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            const image_URL = imageRes.data.imageURL
            setImage(image_URL)
            // 글 화면에 이미지 띄우기
            callback(image_URL, 'image')
        } catch (e) {
            console.error(e.response)
        }
        */

    }

    const showContent = async () => {

        const editorIns = (editorRef.current as Editor | null)?.getInstance();




        //const editorIns = (ref.current as Editor | null)?.getInstance();

        // const HTML = editorIns.getMarkdown()
        
         // if content is changed, and then the preview is changed

         




         
        const content = editorIns?.getHTML();


        ///console.log('html===', content);



        //const content = editorIns?.getMarkdown();



        
        
        //console.log('title', title)

        //console.log('content', content)

        console.log('image', image)
        const imageSize = 'style="max-width:20%"'
        const position = content?.indexOf('src')

        const output = [content?.slice(0, position), imageSize, content?.slice(position)].join('')

        //console.log('output', output)
        // 작성글 서버로 보내기


        
        handleSubmit(
            content as string,
           
        )
    



        /*
        try {
            const postContent = await apiInstance.post('/community/content', { userIdx: userIdx, title: title, content: output, file: image })
            router.replace('/community/feed')
            toast.success(`${postContent.data.idx} 번 글 작성 완료!`)
        } catch (e) {
            console.error(e.response)
        }
        */
    }

     /*
    return (
       
        <WriteContainer>
            <WriteTitle type='text' placeholder='제목을 입력해주세요!' onChange={handleChange} />
            <WriteEditor>
      
                <Editor
                    ref={editorRef}
                    initialValue=''
                    placeholder='글을 작성해주세요!'
                    initialEditType='markdown'
                    previewStyle="tab"
                    height='60rem'
                    theme={'dark'}
                    toolbarItems={toolbarItems}
                    plugins={[colorSyntax]}
                    hooks={{ addImageBlobHook: onUploadImage }}
                />

       
            </WriteEditor>
            <WriteBtn>
                <button onClick={() => router.push('/community/feed')}>나가기</button>
                <button onClick={showContent}>저장</button>
            </WriteBtn>
        </WriteContainer>
        
    )
    */


    /*
    useEffect(() => {
            ///const editorInstance = (editorRef.current?.getInstance() as Editor | undefined);

            const editorIns = (editorRef.current as Editor | null)?.getInstance();

            if (editorIns) {
                editorIns.insertToolbarItem(
                    { groupIndex: 3, itemIndex: 3 },
                    {
                        name: 'youtube',
                        tooltip: 'youtube',
                        className: 'toastui-editor-toolbar-icons',
                        style: { backgroundImage: `url(${youtubeLogo})`, backgroundSize: '25px', color: 'red' },
                    }
                );
                
                editorIns.removeHook('addImageBlobHook');
                //addHook...
            }
        }, [])
    */


    //const editorRef = useRef<Editor>(null);

    useEffect(() => {
        // addCommand는 3번째 인자의 콜백함수로 반드시 저 4개의 인자를 받으며 성공 여부를 리턴하는 함수를 담아야 한다.
        //editorRef.current?.getInstance().addCommand('markdown', 'addYoutube', (payload, state, dispatch, view) => {

        const editorIns = (editorRef.current as Editor | null)?.getInstance();

        //editorIns?.addCommand('markdown', 'addYoutube', (payload, state, dispatch, view) => {
        // html
        editorIns?.addCommand('wysiwyg', 'addYoutube', (payload, state, dispatch, view) => {


            let url = prompt('추가할 youtube 영상의 주소창 url을 담아주세요!');
            
            // url을 담지 않거나, 취소했을경우 취소.
            if(!url) return false;


            url = url?.split('=').at(-1) ?? '';


            console.log('url', url);

            /*
            const str = `<iframe src="https://www.youtube.com/embed/${url}" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            
            //editorRef.current?.getInstance().insertText(str);
            
            editorIns?.insertText(str);
            */

            // iframe 태그 생성

            // extrat youtube video id from url
            ///const videoId = url.split('v=')[1];

            // youtube allow fullscreen

            const iframeHTML = `
              
                    <iframe src="https://www.youtube.com/embed/${url}"

                        title="YouTube video player"
                        
                        allow="
                            accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture

                        
                        "

                        allowfullscreen
                        


                        style="width: 100%; height: 500px;"

                        
                    >
                    </iframe>
                
            `;

            //editorIns?.insertText(iframeHTML);

            // insert iframe tag node to the editor
            editorIns?.setHTML(
                editorIns?.getHTML() + iframeHTML
            );









            return true;
        })
        
        ///editorRef.current?.getInstance().insertToolbarItem(

        editorIns?.insertToolbarItem(

            // change size of tookbar
            //  
            


            { groupIndex: 3, itemIndex: 3 },


            
            {
                name: 'youtube',
                tooltip: 'youtube',
                
                className: 'toastui-editor-toolbar-icons',

                
                ///style: { backgroundImage: `url(${youtubeLogo})`, backgroundSize: '25px', color: 'red' },

                style: {
                    backgroundImage: `url(${youtubeLogo})`, backgroundSize: '25px', color: 'red',
                    // padding top
                    //paddingTop: '10px',
                    // margin top
                    marginTop: '10px',
                
                },



                command: 'addYoutube'   // 트리거를 담으면 툴바아이템의 클릭이벤트에 맞춰진다.
            }

        );
        
        ///editorRef.current?.getInstance().removeHook('addImageBlobHook');

        editorIns?.removeHook('addImageBlobHook');

        //addHook...

        editorIns?.addHook('addImageBlobHook', onUploadImage);

    }, [])









    return (
        <div
            ///className="w-[960px] mx-auto"
            className="col-span-8 "
        >
            {/*
            <input type='text' placeholder='제목을 입력해주세요!' onChange={handleChange} />
            */}


            <Editor

                ///ref={ ref }


                ref={editorRef}


                initialValue={
                    initialValue
                }   

                placeholder='글을 작성해주세요!'

                // change tool size
                // change the size of the toolbar





                // change the height of the toolbar





                
                // if content is changed, and then the preview is changed


                
                //initialEditType='markdown'

                initialEditType='wysiwyg'

                // language 설정
                
                //language={language}

                
                //previewStyle="tab"

                //language="ko-kr"


                //previewStyle='vertical'
                previewStyle={window.innerWidth > 1000 ? 'vertical' : 'tab'}

                // markdown is hidden

                //hideModeSwitch={true}

                
                //height='60rem'
                height='500px'
                
                //theme={'dark'}

                toolbarItems={toolbarItems}

                plugins={[[colorSyntax, colorSyntaxOptions]]}

                
                
                //hooks={{ addImageBlobHook: onUploadImage }}





                // TypeError: this.wwCommands[name] is not a function


                
                customHTMLRenderer={{

                    htmlBlock: {
                      iframe(node) {
                        return [
                            {
                                type: 'openTag',
                                tagName: 'iframe',
                                outerNewLine: true,
                                attributes: node.attrs,
                            },
                            {
                                type: 'html',
                                content: node.childrenHTML ?? '',
                            },  // 여기 반드시 string이어야 한다
                            {
                                type: 'closeTag',
                                tagName: 'iframe',
                                outerNewLine: true,
                                ///outerNewLine: false,
                            },
                        ];
                      },
                    },

                    htmlInline: {

                        big(node, { entering }) {

                            return entering
                                ? { type: 'openTag', tagName: 'big', attributes: node.attrs }
                                : { type: 'closeTag', tagName: 'big' };

                        },

                    },
                }}
                


                /*
                customHTMLRenderer={{
                    htmlBlock: {
                      iframe(
                        node
                    ) {
                        return [
                          {
                            type: "openTag",
                            tagName: "iframe",
                            outerNewLine: true,
                            attributes: node.attrs,
                          },
                          { type: "html", content: node.childrenHTML },
                          { type: "closeTag", tagName: "iframe", outerNewLine: false }
                        ];
                    }}
                  }}
                  */







            />
            {/*
            <button onClick={() => router.push('/community/feed')}>나가기</button>
            */}
            
            
            <div className="flex justify-end gap-4 border-t bg-white  py-4 dark:bg-gray-50 ">
                {/*
                <button
                    onClick={showContent}
                    className="w-full @xl:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
                >
                    저장
                </button>
                */}


                <Button
                    type="submit"
                    //isLoading={isLoading}
                    className="w-full @xl:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
                    onClick={showContent}
                >

                    저장하기
                 </Button>


            </div>

            

            

            
        </div>
    )


}

export default WysiwygEditor