<script>
export default {
name: 'AppHeader',
}
</script>

<template>
    <header class="app-header">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-hide col-md-4">
                    <img class="logo" src="../../../public/logo.png" alt="Logo">
                </div>

                <div class="col-sm-12 col-md-4"> 
                    <div class="search-box">
                        <button class="btn-search"><i class="fas fa-search"></i></button>
                        <input type="text" class="input-search" placeholder="Cerca un BnB...">
                    </div>
                </div>
                

                <div class="col-sm-hide col-md-4 col-lg-2 justify-content-center">
                    <a href="#">Login</a>
                    <a href="#">Register</a>
                </div>
                <div class="col-sm-hide col-lg-2 col-md-hide justify-content-start">
                    <div class="user-img">
                        <img src="../../../public/user-key-svgrepo-com.svg" alt="User"> 
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.app-header{
    padding-top: 20px;
    .col-sm-12{
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        .search-box{
            width: fit-content;
            height: fit-content;
            position: relative;
        }
        .input-search{
            height: 50px;
            width: 50px;
            border-style: none;
            padding: 10px;
            font-size: 18px;
            outline: none;
            border-radius: 25px;
            transition: all .5s ease-in-out;
            background: linear-gradient(
                45deg,
                #ce6a6c,
                #ebada2
            );
            padding-right: 40px;
            color:#f7ede2;
        }
        .input-search::placeholder{
            color:rgba(255,255,255,.5);
            font-size: 18px;
            font-weight: 100;
        }
        .btn-search{
            width: 50px;
            height: 50px;
            border-style: none;
            font-size: 20px;
            font-weight: bold;
            outline: none;
            cursor: pointer;
            border-radius: 50%;
            position: absolute;
            right: 0px;
            color:#f7ede2 ;
            background-color:transparent;
            pointer-events: painted;  
            &:hover{
                transform: scale(1.2);
                transition: all 0.3s ease-in-out;
            }
        }
        .btn-search:focus ~ .input-search{
            width: 450px;
            border-radius: 0px;
            background: transparent;
            border-bottom:1px solid #f7ede2;
            transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
        }
        .input-search:focus{
            width: 450px;
            border-radius: 0px;
            background: transparent;
            border-bottom:1px solid #f7ede2;
            transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
        }
    }
    .col-md-4{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0px 50px;
        .logo{
            width: 150px;
            height: 100px;
        }
    }
    .col-lg-2{
        display: flex;
        align-items: center;
        a{
            color: #f7ede2;
            text-decoration: none;
            font-weight: bold;
            font-size: 1.2rem;
            margin: 0px 20px;
            &:hover{
                color: #f6bd60;
                transform: scale(1.2);
                transition: all 0.3s ease-in-out;
            }
        }
        .user-img{
            height: 60px;
            width: 60px;
            border-radius: 50%;
            background-color: #f7ede2;
            padding: 5px;
            img{
                height: 100%;
                width: 100%;
                border-radius: 50%;
                object-fit: cover;
            }
        }
    }
}
    /* Su dispositivi mobile (fino a 767px) */
    @media (max-width: 767px) {
        .col-sm-hide {
            display: none !important;
        }
        .search-box .btn-search:focus ~ .input-search,
        .search-box .input-search:focus {
            width: 450px !important;
            border-radius: 0px;
            background-color: transparent;
            border-bottom: 1px solid #f7ede2;
            transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
        }
    }
    /* Su dispositivi tablet (da 768px a 991px) */
    @media (min-width: 768px) and (max-width: 991px) {
        .col-md-hide {
            display: none !important;
        }
        .search-box .btn-search:focus ~ .input-search,
        .search-box .input-search:focus {
            width: 300px !important;
            border-radius: 0px;
            background-color: transparent;
            border-bottom: 1px solid #f7ede2;
            transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
        }
}
</style>