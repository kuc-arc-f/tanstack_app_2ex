import { createFileRoute } from '@tanstack/react-router'
import Config from '../../config'
import path from 'path';
import { promises as fs } from 'fs';

export const Route = createFileRoute('/api/user_setup_start')({
  server: {
    handlers: {

      // POST
      POST: async ({ request }) => {

        const body = await request.json()
        console.log(body)
        const user_id = body.user_id;
        const password = body.password;
        if(!user_id){
          return Response.json({
            success: false,
            message: 'error , user_id = NONE',
            data: body,
          })

        }

        // 送信したいデータ
        const data = {
          user_id: user_id,
        };
        try {
          console.log("url=", Config.EXTERNAL_API_URL)
          const response = await fetch(Config.EXTERNAL_API_URL + '/api/user_setup_start', {
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
          message: 'LOGIN OK',
          data: body,
        })
      },

    },
  },
})