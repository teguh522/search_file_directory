import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { getAllFiles } from '../lib/searchFile'

export default function Home({ files }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [file, setFile] = useState([])
  const router = useRouter()
  const { sep } = router.query

  useEffect(() => {
    const file = files.filter((item: any) => {
      return item.includes(sep)
    })
    setFile(file)
  }, [files])

  const handleChange = async (e: any) => {
    try {
      const namafile = e.target.value
      if (namafile === "") {
        setFile([])
      } else {
        const file = files.filter((item: File[]) => {
          return item.includes(namafile)
        })
        setFile(file)
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="mt-10 flex justify-center text-4xl">
        <input placeholder="Search file"
          type="text"
          onChange={handleChange}
          className="w-8/12 h-16 rounded-xl border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" />
      </div>
      <div className="mt-10 flex justify-center">
        <div className="bg-white rounded-xl w-8/12">
          <ul className="list-disc">
            {
              file.map((item) => {
                let convert = item.split("/public").pop();
                return (
                  <p className="m-4 p-2 bg-blue-200 rounded-2xl"><a href={convert} target="_blank" rel="noopener noreferrer">{convert}</a> </p>
                )
              })
            }
          </ul>
        </div>
      </div>
    </div>
  )
}


type File = {
  namafile: string
}




export const getServerSideProps: GetServerSideProps = async () => {
  // const res = await fetch('http://localhost:3200')
  const res = getAllFiles('./public/files')
  const files: File[] = res

  if (!files) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      files,
    },
  }
}





