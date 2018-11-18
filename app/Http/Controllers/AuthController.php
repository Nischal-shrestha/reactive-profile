<?php
namespace App\Http\Controllers;

use App\User;
use App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(['jwt.auth'], ['except' => ['login', 'register', 'refresh']]);
    }
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        if ($request->has(['email', 'password'])) {
            $credentials = $request->only('email', 'password');
        } else {
            abort(401);
        }
        if (!$token = auth()->attempt($credentials)) {
            $response["status"] = "FAILED";
            $response["error"]["message"] = "Your credentials are invalid.";
        } else {
            return $this->respondWithUserAndToken($token);
        }
        return response()->json($response, 200);
       
        // return $this->respondWithToken($token);
    }

    public function register(Request $request)
    {
        if ($request->has(['email', 'password', 'name'])) {
            $validate = Validator::make($request->all(), User::$storeRules);
            if (!$validate->fails()) {
                $user = new User($request->only(['name', 'email', 'password']));
                $user->password = bcrypt($request->password);
                if ($user->save()) {
                    $token = auth()->login($user);

                    return $this->respondWithUserAndToken($token, true);
                }
                return response()->json(["status" => "FAILED", 'message' => "Couldn't save the user"], 200);
            } else {
                $errors["status"] = "FAILED";
                $errors["errors"] = $validate->errors();
                return response()->json($errors, 200);// 422 - unprocessable request
            }
        } else {
            return response()->json(['status' => 'FAILED', 'message' => 'Invalid Request']);
        }

    }




    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(['user' => auth()->user()]);
    }
    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();
        return response()->json(['status' => 'SUCCESS']);
    }
    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }
    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

    protected function respondWithUserAndToken($token, $register = false)
    {
        $user = auth()->user();
        $response["status"] = $register ? "CREATED" : "SUCCESS";
        $response['access_token'] = $token;
        $response['token_type'] = 'bearer';
        $response['expires_in'] = auth()->factory()->getTTL() * 60;
        $response["user"]["id"] = $user->id;
        $response["user"]["name"] = $user->name;
        $response["user"]["email"] = $user->email;

        return response()->json($response, $register ? 201 : 200);
    }

    public function payload()
    {
        return auth()->payload();
    }
}