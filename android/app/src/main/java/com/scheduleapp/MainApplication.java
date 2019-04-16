package com.scheduleapp;

import android.app.Application;


// linear gradient 
import com.BV.LinearGradient.LinearGradientPackage;


//adding to have facebook Login 
import com.facebook.react.ReactApplication;
import org.reactnative.camera.RNCameraPackage;

import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;


import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage; 
import io.invertase.firebase.auth.RNFirebaseAuthPackage; // <-- Added for auth() calls
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage; // added for firestore stuff

import com.goldenowl.twittersignin.TwitterSigninPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;

import com.facebook.react.ReactNativeHost;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;


import com.airbnb.android.react.maps.MapsPackage;


import java.util.Arrays;
import java.util.List;
import android.support.multidex.MultiDexApplication;

public class MainApplication extends MultiDexApplication  implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();
  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNCameraPackage(),
            new PickerPackage(),
          new RNFetchBlobPackage(),
          new LinearGradientPackage(),
          new ImagePickerPackage(),
          new VectorIconsPackage(),
          new RNFirebasePackage(),
          new RNFirebaseAuthPackage(),
          new RNFirebaseStoragePackage(),
          new RNFirebaseFirestorePackage(),
          new TwitterSigninPackage(),
          new RNGoogleSigninPackage(),
          new RNGestureHandlerPackage(),
          // added mCallbackManager as a parameter as a fix to the issue https://github.com/facebook/react-native-fbsdk/issues/429
          new FBSDKPackage(mCallbackManager),
          new MapsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    AppEventsLogger.activateApp(this);
    //...
  }


}
