import React , {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import NavbarComponent from '../../../components/dashboard/NavbarComponent'
import { jwtDecode } from 'jwt-decode'

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Image } from 'primereact/image';
import { FilterMatchMode} from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
// import { CustomerService } from './service/CustomerService';
        

function PostPage() {
const navigate = useNavigate()

const [posts, setPost] = useState([])
const [user,setUser]=useState(null)

    useEffect(()=>{
        postHandler()
        setLoading(false);
    },[])

    const postHandler = async () => {
        try {
            const res =  await axios.get('http://localhost:4000/api/token')
            console.log(res);
            const decoded = jwtDecode(res.data.token)
            console.log(decoded);
            console.log(decoded.name);
            setUser(decoded.name)

            
            const resPost = await axios.get('http://localhost:4000/api/postUser',{
              headers : {
                Authorization : 'Bearer ' + res.data.token
              }
            })
            console.log(resPost.data.data);
            setPost(resPost.data.data)

        } catch (error) {
            console.log(error.response.data);
            navigate('/signin')
            
        }
 
    }

    const deleteHandler = async (event,id) =>{
      event.preventDefault();
      console.log(id)

      try {
        const res = await axios.delete(`http://localhost:4000/api/post/${id}`)
        console.log(res);
        // setPost(prevPosts => prevPosts.filter(post => post.post_id !== id))
        postHandler();
      } catch (error) {
        console.log(error.response);
      }

    }

    const imageBody = (posts)=>{
      return <Image src={`http://localhost:4000/${posts.thumbnail}`} alt="Image" width="100" preview />
    }
    const author = (posts)=>{
      return posts.post_id.toString()
    }


    const deletePost = (posts) => {
      return <button type='submit' className='btn btn-danger' onClick={(event) => deleteHandler(event, posts.post_id)} >delete</button>
    }

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    
// eslint-disable-line react-hooks/exhaustive-deps

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </IconField>
            </div>
        );
    };

    const header = renderHeader();





    
  return (

    <>
 <div className="page">
  {/* Navbar */}
 <NavbarComponent user={user} />
  <div className="page-wrapper">
    {/* Page header */}
    <div className="page-header d-print-none">
      <div className="container-xl">
        <div className="row g-2 align-items-center">
          <div className="col">
            {/* Page pre-title */}
            <div className="page-pretitle">Overview</div>
            <h2 className="page-title">Navbar sticky</h2>
          </div>
          {/* Page title actions */}
          <div className="col-auto ms-auto d-print-none">
            <div className="btn-list">
              <span className="d-none d-sm-inline">
                <a href="/" className="btn">
                  New view
                </a>
              </span>
              <a
                href="/"
                className="btn btn-primary d-none d-sm-inline-block"
                data-bs-toggle="modal"
                data-bs-target="#modal-report"
              >
                {/* Download SVG icon from http://tabler-icons.io/i/plus */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 5l0 14" />
                  <path d="M5 12l14 0" />
                </svg>
                Create new report
              </a>
              <a
                href="/"
                className="btn btn-primary d-sm-none btn-icon"
                data-bs-toggle="modal"
                data-bs-target="#modal-report"
                aria-label="Create new report"
              >
                {/* Download SVG icon from http://tabler-icons.io/i/plus */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 5l0 14" />
                  <path d="M5 12l14 0" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Page body */}
    <div className="page-body">
      <div className="container-xl">
        <div className="row row-deck row-cards">



        <div className="card">
            <DataTable value={posts} paginator rows={10} rowsPerPageOptions={[1, 10, 25, 50]} dataKey="id" filters={filters} loading={loading}
                    globalFilterFields={['title', 'content', 'representative.name', 'status']} header={header} emptyMessage="No data found.">
                <Column field="thumbnail" header="Thumbnail" body={imageBody} sortable style={{ width: '25%' }}></Column>
                <Column field="title" header="Title" sortable style={{ minWidth: '12rem' }} />
                <Column field="content" header="Content" sortable style={{ minWidth: '12rem' }} />
                <Column header="Author" body={author} style={{ minWidth: '14rem' }}/>
                <Column field="" header="" body={deletePost} style={{ minWidth: '12rem' }}  />
            </DataTable>
        </div>


        </div>
      </div>
    </div>
    <footer className="footer footer-transparent d-print-none">
      <div className="container-xl">
        <div className="row text-center align-items-center flex-row-reverse">
          <div className="col-lg-auto ms-lg-auto">
            <ul className="list-inline list-inline-dots mb-0">
              <li className="list-inline-item">
                <a
                  href="https://tabler.io/docs"
                  target="_blank"
                  
                  className="link-secondary"
                  rel="noreferrer"
                >
                  Documentation
                </a>
              </li>
              <li className="list-inline-item">
                <a href="./license.html" className="link-secondary">
                  License
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  href="https://github.com/tabler/tabler"
                  target="_blank"
                  className="link-secondary"
                  rel="noreferrer"
                >
                  Source code
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  href="https://github.com/sponsors/codecalm"
                  target="_blank"
                  className="link-secondary"
                  rel="noreferrer"
                >
                  {/* Download SVG icon from http://tabler-icons.io/i/heart */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon text-pink icon-filled icon-inline"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                  </svg>
                  Sponsor
                </a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-lg-auto mt-3 mt-lg-0">
            <ul className="list-inline list-inline-dots mb-0">
              <li className="list-inline-item">
                Copyright © 2023
                <a href="." className="link-secondary">
                  Tabler
                </a>
                . All rights reserved.
              </li>
              <li className="list-inline-item">
                <a
                  href="./changelog.html"
                  className="link-secondary"
                  rel="noopener"
                >
                  v1.0.0-beta19
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</div>


</>




  )
}

export default PostPage
