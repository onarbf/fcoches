import { NextRequest, NextResponse } from "next/server"


export function middleware(request: NextRequest){
    const privatePaths = {
        profile: '/profile'
    }

        
    const unAuthPaths = {
        signup: '/user/signup',
        login: '/user/login',
        recoverPasswordOne: '/user/recoverPassword/one',
        recoverPasswordTwo: '/user/recoverPassword/two',
        verifyEmail: '/user/verifyEmail',
    }

    const publicPaths = {
        root: '/' 
    }

    const path = request.nextUrl.pathname
    
    const token = request.cookies.get('token')?.value || ''
    console.log('token middleware', token)


    if (Object.values(privatePaths).indexOf(path) !== -1 && !token){
        console.log('rutas privadas')
        return NextResponse.redirect(new URL('/user/login', request.nextUrl))
    }

    if (Object.values(unAuthPaths).indexOf(path) !== -1 && token){
        console.log('rutas no auth')
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }
    
    if (Object.values(publicPaths).indexOf(path) !== -1){
        console.log('rutas publicas')
    }
}

export const config ={
    matcher: [
        '/',
        '/user/signup',
        '/user/login',
        '/profile',
        '/user/recoverPassword/one',
        '/user/recoverPassword/two',
    ]
}

        // '/profile/:path*',
        // '/user/login',
        // '/user/signup',
        // '/user/verifyEmail',
        // '/user/recoverPassword/:path*'


    
        // const token = request.cookies.get('token')?.value || ''
        // console.log('token middleware', token)
        // if(isPublicPath && token){

        // }
    
        // if(!isPublicPath && !token){
        //     
        // }