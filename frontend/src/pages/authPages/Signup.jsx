import { useState } from "react";
import { Link } from "react-router-dom";
import { FaCamera, FaImage, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Input from "../../components/form/input/InputField";
import HomeAndTheme from "../../components/common/HomeAndTheme";
import BrandID from "../../components/logo/BrandID";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // new - for image upload
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  // const handleImageUpload = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   // Validate file type
  //   if (!file.type.startsWith("image/")) {
  //     Swal.fire({
  //       title: "Invalid File",
  //       text: "Please select an image file",
  //       icon: "error",
  //       confirmButtonColor: "#DC143C",
  //     });
  //     return;
  //   }

  //   // Validate file size (5MB limit)
  //   if (file.size > 5 * 1024 * 1024) {
  //     Swal.fire({
  //       title: "File Too Large",
  //       text: "Please select an image under 5MB",
  //       icon: "error",
  //       confirmButtonColor: "#DC143C",
  //     });
  //     return;
  //   }

  //   setImageFile(file);
  //   setImagePreview(URL.createObjectURL(file));
  //   setUploadingImage(true);

  //   // Upload the image
  //   try {
  //     const uploadResult = await uploadProfileImage(file);
  //     if (uploadResult.isSuccessful) {
  //       const newProfilePictureUrl = uploadResult.profilePictureUrl;

  //       setFormData((prev) => ({
  //         ...prev,
  //         profilePictureUrl: newProfilePictureUrl,
  //       }));

  //       // Immediately update user profile with new image
  //       const updateResult = await updateUserProfile({
  //         ...formData,
  //         imageUrl: newProfilePictureUrl,
  //       });

  //       if (updateResult.isSuccessful) {
  //         Swal.fire({
  //           title: "Success",
  //           text: "Profile picture updated successfully",
  //           icon: "success",
  //           confirmButtonColor: "#DC143C",
  //           timer: 1500,
  //         });
  //       } else {
  //         throw new Error(
  //           updateResult.message || "Failed to update profile with new image",
  //         );
  //       }
  //     } else {
  //       throw new Error(uploadResult.message);
  //     }
  //   } catch (error) {
  //     console.error("Image upload failed:", error);
  //     Swal.fire({
  //       title: "Upload Failed",
  //       text: error.message || "Failed to upload image. Please try again.",
  //       icon: "error",
  //       confirmButtonColor: "#DC143C",
  //     });
  //   } finally {
  //     setUploadingImage(false);
  //   }
  // };

  const handleImageUpload = async (e) => {
    console.log("image uploaded");
  };

  return (
    <main className="flex itemscenter min-hscreen p6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xlmx-auto overflow-hidden rounded-lg shadow-xl">
        <section className="flex flex-col min-h-screen overflow-y-auto md:flex-row">
          <article className="h-32 md:h-auto md:w-1/2 relative md:border-r-2 border-gray-200 dark:border-gray-800">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src="./src/assets/img/create-account-office.jpeg"
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src="./src/assets/img/create-account-office-dark.jpeg"
              alt="Office"
            />
            {/* brand logo and tagline */}
            <div className="absolute inset-0 p-1 grid place-items-center bg-white/40 dark:bg-black/40 backdrop-blur-xs">
              <BrandID tagline />
            </div>
          </article>
          <article className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <form className="w-full">
              <h1 className="mb-5 md:mb-7 text-2xl md:text-3xl font-bold text-gray-700 dark:text-gray-200">
                Create account
              </h1>
              <div>
                <label
                  htmlFor="email"
                  className="inline-block mb-2 not-first:text-gray-700 dark:text-gray-400 cursor-pointer">
                  Email<span className="text-error-500">*</span>
                </label>
                <Input type="email" id="email" placeholder="Enter your Email" />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="inline-block mt-4 mb-2 not-first:text-gray-700 dark:text-gray-400 cursor-pointer">
                  Password<span className="text-error-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    className="pr-[62px]"
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-1/2 -translate-y-1/2 border-l border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <FaRegEye className="size-5" />
                    ) : (
                      <FaRegEyeSlash className="size-5" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="inline-block mt-4 mb-2  not-first:text-gray-700 dark:text-gray-400 cursor-pointer">
                  Confirm Password<span className="text-error-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    className="pr-[62px]"
                    id="confirmPassword"
                    placeholder="Re-enter your Password"
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-1/2 -translate-y-1/2 border-l border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400 cursor-pointer"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }>
                    {showConfirmPassword ? (
                      <FaRegEye className="size-5" />
                    ) : (
                      <FaRegEyeSlash className="size-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Profile Image Upload Section */}
              <div className="pt-6">
                {/* <h3 className="sm:text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <FaCamera className="text-brand-500" />
                  Profile Image
                </h3> */}

                {/* Image Upload Loading */}
                {uploadingImage && (
                  <div className="flex items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-brand-500 mr-2"></div>
                    <span className="text-blue-700 dark:text-blue-300">
                      Uploading image...
                    </span>
                  </div>
                )}

                {/* Current Image Preview */}
                {/* {imagePreview && !uploadingImage && (
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Profile Preview"
                        className="w-24 h-24 rounded-full object-cover border-4 border-brand-500 shadow-lg"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-brand-500 text-white rounded-full p-1">
                        <FaImage className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                )} */}

                {/* Image Upload */}
                <div>
                  <label
                    htmlFor="imageUpload"
                    className="block w-fit text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 cursor-pointer">
                    Upload Profile Image
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      name="imageUpload"
                      id="imageUpload"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className={`w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-black dark:text-white transition-all file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold ${
                        uploadingImage
                          ? "file:bg-gray-400 file:cursor-not-allowed cursor-not-allowed"
                          : "file:bg-brand-500 file:text-white hover:file:bg-dark-brand-500 file:cursor-pointer cursor-pointer"
                      }`}
                    />
                    <FaCamera className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Maximum file size: 5MB. Supported formats: JPG, PNG, GIF,
                    WebP
                  </p>
                </div>

                {/* Current Image URL (hidden) */}
                <input
                  type="hidden"
                  name="profilePictureUrl"
                  // value={formData.profilePictureUrl}
                />
              </div>

              <button
                type="submit"
                className="block w-full px-4 py-3 mt-8 text-lg font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple cursor-pointer">
                Create account
              </button>
              <hr className="my-8 dark:text-gray-600" />
              <p className="mt-4">
                <Link
                  to="/signin"
                  className="text-lg font-medium text-purple-600 dark:text-purple-400 hover:underline">
                  Have an account? Login
                </Link>
              </p>
            </form>
          </article>
        </section>
      </div>

      {/* home and theme toggle button */}
      <HomeAndTheme />
    </main>
  );
};

export default SignUp;
