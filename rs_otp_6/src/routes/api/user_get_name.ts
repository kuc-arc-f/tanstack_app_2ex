import { createFileRoute } from '@tanstack/react-router'
import Config from '../../config'
import path from 'path';
import { promises as fs } from 'fs';

export const Route = createFileRoute('/api/user_get_name')({
  server: {
    handlers: {

      // POST
      POST: async ({ request }) => {

        console.log("#user_get_name")
        const body = await request.json()
        console.log(body)
        const userId = body.userId;
        const username = body.username;
        if(!username){
          console.log("error, username = NONE")
          return Response.json({
            success: false,
            message: 'error, username = NONE',
            data: {},
          })
        }
        // 送信したいデータ
        const data = {
          email: body.username,
        };
        console.log(data)
        try {
          console.log("url=", Config.EXTERNAL_API_URL)
          const response = await fetch(Config.EXTERNAL_API_URL + '/api/user_get_name', {
            method: 'POST', // リクエストメソッドを指定
            headers: {
              'Content-Type': 'application/json' // JSONを送ることを伝える
            },
            body: JSON.stringify(data) // データをJSON文字列に変換
          });
          if (!response.ok) {
            throw new Error(`HTTPエラー! ステータス: ${response.status}`);
          }
          // 返ってきたJSONデータを解析
          const result = await response.json();
          console.log('成功:', result);
          return Response.json({
            success: true,
            message: 'INSERT OK',
            data: result,
          })          
        } catch (error) {
          console.error('エラーが発生しました:', error);
          return Response.json({
            success: false,
            message: 'エラーが発生しました: '+ error,
            data: body,
          })          
        }        
        return Response.json({
          success: true,
          message: '',
          data: {},
        })
      },

    },
  },
})