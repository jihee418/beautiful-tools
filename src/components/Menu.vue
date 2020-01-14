<template>
    <sui-menu
        is="sui-sidebar"
        inverted="true"
        vertical="true"
        animation="overlay"
        :visible="visible">

        <!-- 메뉴 타이틀 -->
        <sui-menu-item>
            <sui-image :src="'/src/assets/images/rama.png'" spaced="right" size="mini" />
            <strong>
                Beautiful Tools
                &nbsp;&nbsp;
                <small>
                    <em>{{version}}</em>
                </small>
            </strong>
        </sui-menu-item>

        <!-- 메뉴들 -->
        <template v-for="menu in menuList">
            <!-- 하위 메뉴가 있는 메뉴-->
            <sui-menu-item v-if="menu.subMenuList">
                <!-- 상위메뉴 제목 -->
                <sui-menu-header>{{menu.name}}</sui-menu-header>
                <!-- 서브메뉴 -->
                <sui-menu-menu v-for="subMenu in menu.subMenuList">
                    <router-link is="sui-menu-item" :to="String(subMenu.url)">{{subMenu.name}}</router-link>
                </sui-menu-menu>
            </sui-menu-item>

            <!-- 하위 메뉴가 없는 메뉴 -->
            <router-link v-else is="sui-menu-item" :to="String(menu.url)">{{menu.name}}</router-link>
        </template>

    </sui-menu>

</template>

<script>
    export default {
        name: "Menu",
        data: () => {
            return {
                visible: true,
                version: process.version,
                menuList: [
                    { url: '/', name: 'Home '},
                    { url: '/', name: '안녕안녕' },
                    { name: '하위메뉴', subMenuList: [
                        { url: '/', name: 'Sub_Home '},
                        { url: '/', name: 'Sub_안녕안녕' },
                    ] },
                ]
            }
        },
        created: function(){

        },
        mounted: function(){
        },
        computed: {
        }
    }
</script>
