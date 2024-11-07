<script>
export default {
name: 'AppHeader',
}
</script>

<template>
    <header class="app-header">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-hide col-md-4 py-4">
                    <div class="user-img">
                        <img src="../../../public/user-key-svgrepo-com.svg" alt="">
                    </div>
                    <a href="../pages/Homepage.vue">BoolBnB</a>
                </div>

                <div class="col-12 col-md-4 py-4"> 
                    <div class="search-box">
                        <button class="btn-search"><i class="fas fa-search"></i></button>
                        <input type="text" class="input-search" placeholder="Cerca un BnB...">
                    </div>
                </div>

                <div class="col-sm-hide col-md-4 py-4">
                    <a href="#">Login</a>
                    <a href="#">Register</a>
                    <div class="user-img">
                        <img src="../../../public/user-key-svgrepo-com.svg" alt=""> 
                    </div>
                    
                </div>
                
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
    .col-12{
        padding: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        background-color: #192033;
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
            background-color: #84a59d;
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
            width: 300px;
            border-radius: 0px;
            background-color: transparent;
            border-bottom:1px solid rgba(255,255,255,.5);
            transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
        }
        .input-search:focus{
            width: 300px;
            border-radius: 0px;
            background-color: transparent;
            border-bottom:1px solid rgba(255,255,255,.5);
            transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
        }
    }
    .col-md-4{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #192033;
        padding: 0px 80px;
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
            height: 50px;
            width: 50px;
            border-radius: 50%;
            background-color: #f7ede2;
            img{
                height: 100%;
                width: 100%;
                border-radius: 50%;
                object-fit: cover;
            }
        }
    }
    
    /* Su dispositivi mobile (fino a 767px) */
    @media (max-width: 767px) {
        .col-sm-hide {
            display: none;
        }
    }
</style>