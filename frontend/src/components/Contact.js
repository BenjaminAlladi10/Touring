import React from 'react';

export default function Contact() {
  return (
    <div id="contact-us" className="overflow-hidden bg-white py-16 px-4 dark:bg-gray-800 sm:px-6 lg:px-8 lg:py-2">
    <div className="relative mx-auto max-w-xl">
        <svg className="absolute left-full translate-x-1/2 transform" width="404" height="404" fill="none"
            viewBox="0 0 404 404" aria-hidden="true">
            <defs>
                <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20"
                    patternUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="4" height="4" className="text-gray-200 dark:text-slate-600"
                        fill="currentColor"></rect>
                </pattern>
            </defs>
            <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"></rect>
        </svg>
        <svg className="absolute right-full bottom-0 -translate-x-1/2 transform" width="404" height="404" fill="none"
            viewBox="0 0 404 404" aria-hidden="true">
            <defs>
                <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20"
                    patternUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="4" height="4" className="text-gray-200 dark:text-slate-800"
                        fill="currentColor"></rect>
                </pattern>
            </defs>
            <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"></rect>
        </svg>
        <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-slate-200 sm:text-4xl">Contact Us
            </h2>
            <p className="mt-4 text-lg leading-6 text-gray-500 dark:text-slate-400">Please use the form below to contact us.
                Thank you!
            </p>
        </div>
        <div className="mt-8">
            <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div className="sm:col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Name</label>
                    <div className="mt-1">
                        <input name="name" type="text" id="name" autocomplete="organization" required="" className="border border-gray-300 outline-none block w-full rounded-md py-2 px-3 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:border-white/5 dark:bg-slate-700/50 dark:text-white"/>
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Email</label>
                    <div className="mt-1">
                        <input name="email" id="email" required="" type="email" autocomplete="email" className="border border-gray-300 outline-none block w-full rounded-md py-2 px-3 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:border-white/5 dark:bg-slate-700/50 dark:text-white"/>
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Message</label>
                    <div className="mt-1">
                        <textarea required="" name="message" id="message" rows="4" className="border border-gray-300 outline-none block w-full rounded-md py-3 px-4 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:border-white/5 dark:bg-slate-700/50 dark:text-white"></textarea>
                    </div>
                </div>
                <div className="flex justify-end sm:col-span-2">
                    <button type="submit" className="inline-flex items-center rounded-md px-4 py-2 font-medium focus:outline-none focus-visible:ring focus-visible:ring-sky-500 shadow-sm sm:text-sm transition-colors duration-75 text-sky-500 border border-sky-500 hover:bg-sky-50 active:bg-sky-100 disabled:bg-sky-100 dark:hover:bg-gray-900 dark:active:bg-gray-800 dark:disabled:bg-gray-800 disabled:cursor-not-allowed">
                        <span>Send Message</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
  )
}
